import * as request from './request';

/*
 * Variables
 */
let token = {
    access_token: undefined,
    expires_in: undefined,
    refresh_token: undefined,
    scope: undefined
};

let authorizationCode = '';

/*
 * Export functions
 */
export function initialize(callback){
    token = window.storageManager.get('token');

    let token_type = 'authorization';

    // if the token doesn't exist then we need to authenticate the user
    // if the token already exists, just refresh it
    if(token !== null){
        token_type = 'refresh';

        getToken(token_type, function(response_token){
            token = response_token;
            callback();
        });
    } else {
        getAuthorizationCode(function(code){
            authorizationCode = code;

            getToken(token_type, function(response_token){
                token = response_token;
                callback();
            });
        });
    }
}

export function get(key){
    return token[key];
}

/*
 * Internal Functions
 */

function clear(){
    window.storageManager.set('token', null);
    token = null;
    window.location.href = config.connection_url;
}

function getAuthorizationCode(callback){
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

function getToken(type, callback){
    let data = {},
        url = '/oauth2/token';

    // initial exchange of the token
    if(type === 'authorization'){
        data = {
            'client_id': config.client_id,
            'client_secret': config.client_secret,
            'grant_type': 'authorization_code',
            'redirect_uri': config.redirect_uri,
            'code': authorizationCode
        };
    // refresh the token
    } else if(type === 'refresh'){
        data = {
            'client_id': config.client_id,
            'client_secret': config.client_secret,
            'grant_type': 'refresh_token',
            'refresh_token': token.refresh_token
        };
    }

    request.post(config.base_url + url, data, function(response){
        window.storageManager.set('token', response);
        callback(response);
    });
}