import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';

// create a connection

export const handler = async (event, context) => {
  //log user in
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);

  const obj = event.data;
  const churnObj = event.data[obj.length - 1];

  return {
    body: appService.deleteUser(churnObj),
    statusCode: HttpStatus.OK,
  };
};
