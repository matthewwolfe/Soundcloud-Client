class OAuthToken {

    constructor(){
        this.token = {
            access_token: undefined,
            expires_in: undefined,
            refresh_token: undefined,
            scope: undefined
        };
    }

    get(token){
        return this.token;
    }

    set(token){
        this.token = token;
    }
}