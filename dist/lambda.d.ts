import { HttpStatus } from '@nestjs/common';
export declare const handler: (event: any, context: any) => Promise<{
    body: Promise<string>;
    statusCode: HttpStatus;
}>;
