class OAuthToken {

    constructor(){
        this.token = {
            access_token: undefined,
            expires_in: undefined,
            refresh_token: undefined,
            scope: undefined
        };

        // called when the logout button is clicked
        window.messenger.subscribe('logout', function(data){
            this.clear();
        }.bind(this));
    }

    get(token){
        return this.token;
    }

    set(token){
        this.token = token;
    }

    clear(){
        window.storageManager.set('token', null);
        window.location.href = config.connection_url;
    }

    getAuthorizationCode(){
        let url = window.location.href;
        let authorizationCode = url.substring(url.indexOf('=') + 1);

        // the user has already authorized the application
        if(url.indexOf('=') !== -1){
            return authorizationCode;

        // if we don't yet have the authentication code, 
        // then the user needs to connect and authorize the application
        } else {
            window.location.href = config.connection_url;
        }
    }

    getToken(type, callback){
        let data = {},
            url = '/oauth2/token';

        // initial exchange of the token
        if(type === 'authorization'){
            data = {
                'client_id': config.get('client_id'),
                'client_secret': config.get('client_secret'),
                'grant_type': 'authorization_code',
                'redirect_uri': config.get('redirect_uri'),
                'code': this.userAuthCode
            };
        // refresh the token
        } else if(type === 'refresh'){
            data = {
                'client_id': config.get('client_id'),
                'client_secret': config.get('client_secret'),
                'grant_type': 'refresh_token',
                'refresh_token': config.get('refresh_token')
            };
        }

        this.request.post(this.baseUrl + url, data, function(response){
            window.storageManager.set('token', response);
            callback(response);
        });
    }
}