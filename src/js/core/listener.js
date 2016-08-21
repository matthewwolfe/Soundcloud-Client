import { store } from '../index.jsx';
import { node } from './soundcloud/config';
import * as Player from './music/player';

import { resumeTrack, pauseTrack } from '../actions/player';

export function initialize(){
    node.renderer.on('click-play-pause', () => {
        let player = store.getState().player;

        if(!player.isPlaying && player.id !== null){
            store.dispatch(resumeTrack());
        }

        if(player.isPlaying && player.id !== null){
            store.dispatch(pauseTrack());
        }
    });

    node.renderer.on('click-next-track', () => {
        let player = store.getState().player;

        if(player.id !== null){
            Player.playNext();
        }
    });
}