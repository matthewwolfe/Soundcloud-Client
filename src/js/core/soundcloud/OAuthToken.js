class OAuthToken {

    constructor(callback){
        this.request = new Request();
        
        // called when the logout button is clicked
        window.messenger.subscribe('logout', function(data){
            this.clear();
        }.bind(this));


        this.token = {
            access_token: undefined,
            expires_in: undefined,
            refresh_token: undefined,
            scope: undefined
        };


        // first try to get the user token from storage
        this.token = window.storageManager.get('token');

        let token_type = 'authorization';

        // if the token doesn't exist then we need to authenticate the user
        // if the token already exists, just refresh it
        if(this.token !== null){
            token_type = 'refresh';

            this.getToken(token_type, function(response){
                this.token = response;
                callback();

            }.bind(this));
        } else {
            this.getAuthorizationCode(function(authorizationCode){
                this.authorizationCode = authorizationCode;

                this.getToken(token_type, function(response){
                    this.token = response;
                    callback();

                }.bind(this));

            }.bind(this));
        }
    }

    get(key){
        return this.token[key];
    }

    clear(){
        window.storageManager.set('token', null);
        this.token = null;
        window.location.href = config.connection_url;
    }

    getAuthorizationCode(callback){
        let url = window.location.href;
        let authorizationCode = url.substring(url.indexOf('=') + 1);

        // the user has already authorized the application
        if(url.indexOf('=') !== -1){
            callback(authorizationCode);

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
                'client_id': config.client_id,
                'client_secret': config.client_secret,
                'grant_type': 'authorization_code',
                'redirect_uri': config.redirect_uri,
                'code': this.authorizationCode
            };
        // refresh the token
        } else if(type === 'refresh'){
            data = {
                'client_id': config.client_id,
                'client_secret': config.client_secret,
                'grant_type': 'refresh_token',
                'refresh_token': this.token.refresh_token
            };
        }

        this.request.post(config.base_url + url, data, function(response){
            window.storageManager.set('token', response);
            callback(response);
        });
    }
}