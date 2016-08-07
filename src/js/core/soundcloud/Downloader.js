import config from './config';

/*
 * Constants
 */
const path = config.music_download_path;

/*
 * Export Functions
 */
export function initialize(){
    // Initialize the directory
    if(!directoryOrFileExists(path)){
        node.fs.mkdirSync(path);
    }
}

export function downloadTrack(track, dest){
    let url = `https://api.soundcloud.com/tracks/${track.id}/stream?client_id=${config.client_id}`;
    dest = `${path}/${track.title}.mp3`;

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
        file.close();  // close() is async, call cb after close completes.
        setTags(track, dest);
        window.messenger.publish('download-complete', {});
    });

    request.end();
}

/*
 *  Internal Functions
 */
function directoryOrFileExists(path){
    try {
        node.fs.accessSync(path, node.fs.F_OK);
        return true;
    } catch(err){
        return false;
    }
}

function setTags(track, dest){
    // tags must always be strings (mainly duration, which is usually a number)
    let tags = {
        title: track.title.toString(),
        artist: track.user.username.toString(),
        length: track.duration.toString()
    };

    node.id3_writer.write(tags, dest);
}