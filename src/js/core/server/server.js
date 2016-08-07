export function load_server(){
    const express = require('express');
    const ip = require('ip');

    const server = {
        config: {
            host: ip.address(),
            port: 3000,
        }
    };

    const app = express();
    var server_instance = null;

    app.get('/get_tracks', function(req, res){
        window.offlineTracksManager.get(function(tracks){
            res.send({'tracks': tracks});
        });
    });

    app.get('/music/:name', function(req, res, next){
        let file = config.music_download_path + '/' + req.params.name + '.mp3';

        node.fs.access(file, node.fs.F_OK, function(err){
            if(!err){
                res.sendFile(file);
            } else {
                res.send({'status': 404});
            }
        })
    });

    window.messenger.subscribe('toggle-sync', function(data){
        if(data.isSyncing){
            server_instance = app.listen(server.config.port, server.config.host);
        } else {
            if(server_instance !== null){
                server_instance.close();
            }
        }
    });
}
