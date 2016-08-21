import { store } from '../index.jsx';
import { addTracks } from './tracks';
import { search as SC_search } from '../core/soundcloud/soundCloudSDK';

/*
 * Action types
 */
export const SET_SEARCH_RESULTS = 'SEARCH_RESULTS';

/*
 * Action creators
 */
export function fetchSearchResults(query){
    SC_search(query, function(tracks, track_ids){
        store.dispatch(addTracks(tracks));
        store.dispatch(setSearchResults(track_ids));
    });
}

function setSearchResults(tracks){
    return {type: SET_SEARCH_RESULTS, tracks: tracks};
}