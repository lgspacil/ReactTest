import Amplify, { Auth, API } from 'aws-amplify';
import { config } from '../config';
import Timeout from 'await-timeout';
import { AxiosError } from 'axios';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ApiWrapper } from './ApiWrapper';


const HTTP_REQ_TIMEOUT = 22000;
const HTTP_RETRIES = 2;

export class AmplifyWrapper {
    private static instance: AmplifyWrapper;
    private isConnected: boolean | undefined;
    private constructor() {
        // NetInfo.addEventListener(state => {
        //     this.isConnected = state.isConnected;
        // });
    }

    public static getInstance(): AmplifyWrapper {
        if (!AmplifyWrapper.instance) {
            console.log('new instance')
            AmplifyWrapper.instance = new AmplifyWrapper();
        }
        console.log('old instance')
        return AmplifyWrapper.instance;
    }

    public init(env: string): void {
        // if (Object.keys(config.environment).indexOf(env) === -1) {
        //     throw new Error(`Tried to select an unknown environment ${env}`);
        // }
        Amplify.configure({
            Auth: {
                ...config.environment.dev.cognito,
                cookieStorage: {
                    // - Cookie domain (only required if cookieStorage is provided)
                    domain: 'localhost',
                    // (optional) - Cookie path
                    path: '/',
                    // (optional) - Cookie expiration in days
                    expires: 365,
                    // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
                    sameSite: "strict",
                    // (optional) - Cookie secure flag
                    // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
                    secure: false
                },
            },
            API: {
                endpoints: [
                    {
                        ...config.environment.dev.api,
                        name: 'Terraclear API',
                    },
                ],
            },
        });
    }

    public async signIn(
        username: string,
        password: string,
    ): Promise<{ userId: string; isAdmin: boolean; homesteads: { name: string; id: string }[] }> {
        try {
            // const netState = await NetInfo.fetch();
            // if (!netState.isConnected) {
            //     throw new AmplifyError(UserStrings.offline, 'network');
            // }
            const user: CognitoUser = await Auth.signIn(username, password);
            const res = await ApiWrapper.getUserInfo(user.getUsername());
            return {
                userId: res.user.id,
                isAdmin: true,
                homesteads: res.homesteads,
            };
        } catch (ex) {
            console.log('Error signing in', ex);

            if (ex.code === 'NotAuthorizedException') {
                console.log('error');
            }
            throw new Error('Unknown error signing in, please try again');
        }
    }

    public async signOut(): Promise<void> {
        try {
            await Auth.signOut();
        } catch (ex) {
            console.log('Error completing signout', ex);
        }
    }

    public async checkSession(): Promise<boolean> {
        try {
            const session = await Auth.currentSession();
            return session.isValid();
        } catch (e) {
            return false;
        }
    }

    public async httpReq<T>(
        method: 'get' | 'post' | 'delete' | 'put',
        path: string,
        body?: string | object,
        options?: { responseType?: string },
    ): Promise<T> {
        // if (this.isConnected === undefined) {
        // this.isConnected = (await NetInfo.fetch()).isConnected;
        // if (!this.isConnected) {
        //     throw new ConnectivityError(UserStrings.offline);
        // }
        // }

        console.log('inside httpReq')

        for (let i = 0; i < HTTP_RETRIES; i++) {
            try {
                // return this.req(method, path, body, options);
                return Timeout.wrap(this.req(method, path, body, options), HTTP_REQ_TIMEOUT, 'Timeout');
            } catch (ex) {
                if (ex === 'Error: Timeout') {
                    console.info(`Request to ${path} timed out - retrying`);
                    continue;
                }
                throw ex;
            }
        }
        throw new Error('Timeout retries exceeded');
    }

    private async req(
        method: 'get' | 'post' | 'delete' | 'put',
        path: string,
        body?: string | object,
        options?: { responseType?: string },
    ) {
        console.log('inside req ')
        // const tk = "eyJraWQiOiJYU0hUQ1BTQVdOK2pXZGZZT09ra2VVN2tZUnRiYjRVTWRDUExmZDFad013PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ODA0YjIxZC0wMjYwLTQ1MzEtOWJiNi0zMzY4YTg5OWFmMDciLCJldmVudF9pZCI6IjNkZmY0YjM2LWRlMzAtNDMzZi04MjEwLTAwYmZiYTRmZjI2MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTU1Njc5MzMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1hCTVhpb0JvYSIsImV4cCI6MTYxNTU3MTUzMywiaWF0IjoxNjE1NTY3OTMzLCJqdGkiOiI2NjUyMzVkMC0yMGE1LTQ3MDQtYjNlMC03YmEzOTM3NDBjYTQiLCJjbGllbnRfaWQiOiI0MzljanYyZW4yazZlc280cjhzdGdiMHVvdSIsInVzZXJuYW1lIjoiODgwNGIyMWQtMDI2MC00NTMxLTliYjYtMzM2OGE4OTlhZjA3In0.QuwFZy3TPZ9uWcPfCy_1794mu-rXNkuPtH9q2GfPHijYvTuhICSjsSY5KlT-x_W-j8skolvRspSYsAwlW_c93c3CNuTwkrsNplXVtiq3KIL02wfVcsttNaQwL-ySm8S-jJP3lfeJlwGIymssFekg3xjY-qmlNlLR0zOpJscg92_P8SC7FOSvUXtJ9ZYYsacVBMzVCywXPeqQvlOLpXVXMvjSF9lTf5e3RkBAbHX-RxiafBRcxnLdcr4Mr8NpwBkZ0Z0WXqy3X_OzLXpuTQ-DnKQm_Qkj6i_scVlZU2P7S0sxQtvvvhPQrI0OPPogLIdTcDpjkDVhslSROZ0kO_HEKQ"
        const authInit = {
            headers: { Authorization: (await Auth.currentSession()).getIdToken().getJwtToken() },
        };
        // const authInit = {
        //     headers: { Authorization: tk },
        // };
        console.log('----------- ', authInit)
        try {
            let res: any;
            switch (method) {
                case 'get':
                    res = await API.get('Terraclear API', `${path}`, { ...options, ...authInit });
                    break;
                case 'put':
                    res = await API.put('Terraclear API', `${path}`, {
                        ...options,
                        ...authInit,
                        body: JSON.stringify(body),
                    });
                    break;
                case 'post':
                    res = await API.post('Terraclear API', `${path}`, {
                        ...options,
                        ...authInit,
                        body,
                    });
                    break;
                case 'delete':
                    res = await API.post('Terraclear API', `${path}`, {
                        ...options,
                        ...authInit,
                        body: JSON.stringify(body),
                    });
                    break;
            }
            return res;
        } catch (ex) {
            console.log('!!!!!!!!!!!!!! ', ex);
            if (ex.isAxiosError) {
                const err = ex as AxiosError;
                if (err.response) {
                    console.log('request error', { path, resStatus: err.response.status, resData: err.response.data });

                } else {
                    console.log('another error', ex)
                }
            } else {

            }
        }
    }
}
