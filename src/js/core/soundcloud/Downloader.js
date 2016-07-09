class Downloader {

    constructor(){
        this.path = config.music_download_path;

        this.initializeStorage();
    }

    initializeStorage(){
        // initialize the directory
        if(!this.directoryOrFileExists(this.path)){
            node.fs.mkdirSync(this.path);
        }
    }

    directoryOrFileExists(path){
        try {
            node.fs.accessSync(path, node.fs.F_OK);
            return true;
        } catch(err){
            return false;
        }
    }

    downloadTrack(id, title, dest){
        let url = `https://api.soundcloud.com/tracks/${id}/stream?client_id=${config.client_id}`;
        dest = `${this.path}/${title}.mp3`;

        let file = node.fs.createWriteStream(dest);
        let request = node.request.get(url);

        request.pipe(file);

        request.on('error', function(err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
        })
        request.on('response', function(response){
            window.messenger.publish('download-file-size', {size: response.headers['content-length']});
        })
        request.on('data', function(data){
            window.messenger.publish('download-chunk-length', {size: data.length});
        });

        file.on('finish', function() {
            window.messenger.publish('download-complete', {});
            file.close();  // close() is async, call cb after close completes.
        });

        request.end();
    }
}

window.downloader = new Downloader();