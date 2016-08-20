import { store } from '../index.jsx';
import { addTracks } from './tracks';
import * as SC from '../core/soundcloud/soundCloudSDK';

/*
 * Action types
 */

export const SET_TOP_50 = 'SET_TOP_50';
export const SET_TOP_50_KIND = 'SET_TOP_50_TYPE';
export const SET_TOP_50_GENRE = 'SET_TOP_50_GENRE';

/*
 * Action creators
 */

export function setTop50(tracks){
    return {type: SET_TOP_50, tracks: tracks};
}

export function setTop50Kind(kind){
    return {type: SET_TOP_50_KIND, kind: kind};
}

export function setTop50Genre(genre){
    return {type: SET_TOP_50_GENRE, genre: genre};
}

/*
 * Async functions, not action creators
 */
let currentKind = undefined;
let currentGenre = undefined;

export function getTracks(callback){
    let kind = store.getState().top50.kind;
    let genre = store.getState().top50.genre;

    if(kind !== currentKind || genre !== currentGenre){

        currentKind = kind;
        currentGenre = genre;

        SC.getTop50(kind, genre, (tracks, track_ids) => {
            if(tracks.length){
                store.dispatch(addTracks(tracks));
            }

            store.dispatch(setTop50(track_ids));
        });
    }
}