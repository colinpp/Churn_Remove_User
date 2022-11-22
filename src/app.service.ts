import { Injectable } from '@nestjs/common';
import { getToken, getUserJid, deleteUser } from './utils/axios';
@Injectable()
export class AppService {
  async deleteUser(churnObj: any): Promise<string> {
    let outputStr = 'Accepted Churn number';
    if (churnObj.port_in === 'false' && churnObj.port_out === 'false') {
      outputStr = outputStr + ' Deleting msisdn ' + churnObj.msisdn;
      console.log('Deleting user ' + churnObj.msisdn);
    }

    return outputStr;
  }
}
