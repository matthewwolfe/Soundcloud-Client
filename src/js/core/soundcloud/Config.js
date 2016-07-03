const config = {
    base_url: 'https://api-v2.soundcloud.com',
    redirect_uri: 'my-app://callback.html',
    client_id: '173bf9df509c48cf53b70c83eaf5cbbd',
    client_secret: '7ddbd6fcdc2d313abfb65758c751486e',
    connection_url: `https://api.soundcloud.com/connect?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`
};