class Config {

    constructor(){
        this.config = {
            oauth_token: new OAuthToken(),
            base_url: 'https://api-v2.soundcloud.com',
            redirect_uri: 'my-app://callback.html',
            client_id: '173bf9df509c48cf53b70c83eaf5cbbd',
            client_secret: '7ddbd6fcdc2d313abfb65758c751486e'
        };
    }

    /*
     * @param key: String
     *
     * @return: String or Object
     */
    get(key){
        return this.config[key];
    }

    set(key, value){
        if(value){
            this.config[key] = value;
        }
    }
}