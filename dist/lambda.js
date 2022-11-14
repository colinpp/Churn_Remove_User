"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const handler = async (event, context) => {
    const appContext = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const appService = appContext.get(app_service_1.AppService);
    const obj = event.data;
    const churnObj = event.data[obj.length - 1];
    return {
        body: appService.deleteUser(churnObj),
        statusCode: common_1.HttpStatus.OK,
    };
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map