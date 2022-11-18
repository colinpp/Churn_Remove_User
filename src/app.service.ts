import { Injectable } from '@nestjs/common';
import { getToken, getUserJid, deleteUser } from './utils/axios';
@Injectable()
export class AppService {
  async deleteUser(churnObj: any): Promise<string> {
    let access_token ='';
    let userJid = '';
    let outputStr = 'Saved Churn Data';
    if (churnObj.port_in === 'false' && churnObj.port_out === 'false') {
      access_token = await getToken();
      userJid = await getUserJid(access_token, churnObj.msisdn);
      outputStr =
        'Saved churn Data And Deleted user ith msisdn of ' + churnObj.msisdn;
    }

    return outputStr;
  }
}
