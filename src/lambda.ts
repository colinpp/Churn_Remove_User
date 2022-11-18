import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// create a connection

export const handler = async (event, context) => {
  const s3 = new AWS.S3({
    region: process.env.REGION,
  });
  //log user in
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const data = await getObject(bucket, key, s3);
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);

  console.log('data is');
  console.log(data);
  const churnObj = JSON.parse(data).data[0];

  return {
    body: appService.deleteUser(churnObj),
    statusCode: HttpStatus.OK,
  };
};

async function getObject(bucket, objectKey, s3) {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey,
    };

    const data = await s3.getObject(params).promise();

    return data.Body.toString('utf-8');
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`);
  }
}
