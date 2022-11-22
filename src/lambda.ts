import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// create a connection

export const handler = async (event, context) => {
  console.log(process.env.AWS_ACCESS_KEY_ID);

  const s3 = new AWS.S3({
    accessKeyId: 'AKIAY45VE44O7H43GR4Z',
    secretAccessKey: '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',
    region: 'ap-northeast-1',
    signatureVersion: 'v4',
  });
  //log user in
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const data = await getObject(bucket, key, s3);
  const churnObj = JSON.parse(JSON.stringify(data));

  const churnJson = churnObj.data[churnObj.data.length - 1];
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);

  return {
    body: appService.deleteUser(churnJson),
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

    return JSON.parse(data.Body.toString('utf-8'));
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`);
  }
}
