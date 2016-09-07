import * as config from '../core/soundcloud/config';

/*
 * Action types
 */

export const HIDE_DOWNLOADER = 'HIDE_DOWNLOADER';
export const START_DOWNLOAD_TRACK = 'START_DOWNLOAD_TRACK';
export const FINISH_DOWNLOAD_TRACK = 'FINISH_DOWNLOAD_TRACK';
export const UPDATE_DOWNLOAD_TRACK_PROGRESS = 'UPDATE_DOWNLOAD_TRACK_PROGRESS';

/*
 * Action creators
 */

export function hideDownloader(){
    return {type: HIDE_DOWNLOADER};
}

export function startDownload(track){
    return {type: START_DOWNLOAD_TRACK, track: track};
}

export function finishDownload(){
    return {type: FINISH_DOWNLOAD_TRACK};
}

export function updateDownloadProgress(progress){
    return {type: UPDATE_DOWNLOAD_TRACK_PROGRESS, progress: progress};
}

/*
 * Async action creators
 */
export function downloadTrack(track){

    return function(dispatch){
        dispatch(startDownload(track));

        const path = config.music_download_path,
              url = `https://api.soundcloud.com/tracks/${track.id}/stream?client_id=${config.client_id}`,
              dest = `${path}/${track.title}.mp3`;

        let file = config.node.fs.createWriteStream(dest),
            request = config.node.request.get(url),
            fileSize = 0,
            sizeDownloaded = 0;

        request.pipe(file);

        request.on('error', function(err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
        })
        request.on('response', function(response){
            fileSize = response.headers['content-length'];
        })
        request.on('data', function(data){
            sizeDownloaded = sizeDownloaded + data.length;
            dispatch(updateDownloadProgress((sizeDownloaded / fileSize) * 100));
        });

        file.on('finish', function() {
            file.close();
            setTags(track, dest);
            dispatch(finishDownload());
        });

        request.end();
    };
}

/*
 *  Internal Functions
 */
function initialize(){
    // Initialize the directory
    if(!directoryOrFileExists(path)){
        config.node.fs.mkdirSync(path);
    }
}

function directoryOrFileExists(path){
    try {
        config.node.fs.accessSync(path, node.fs.F_OK);
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

    config.node.id3_writer.write(tags, dest);
}