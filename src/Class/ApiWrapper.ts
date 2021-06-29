import { AmplifyWrapper } from './AmplifyWrapper';
import { Auth } from "aws-amplify";

export class ApiWrapper {

    public static getUserInfo(userId: string): Promise<any> {
        return AmplifyWrapper.getInstance().httpReq('get', `/user/${userId}`);
    }

    public static async getAllOrders(homesteadId?: string): Promise<any> {
        if (homesteadId) {
            return AmplifyWrapper.getInstance().httpReq('get', `/homestead/${homesteadId}/orders`);
        }
        return AmplifyWrapper.getInstance().httpReq('get', `/orders/?allZones=true`);
    }

}
