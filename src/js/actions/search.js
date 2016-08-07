import { search as SC_search } from '../core/soundcloud/soundcloudSDK';

/*
 * Action types
 */
export const SEARCH_RESULTS = 'SEARCH_RESULTS';

/*
 * Action creators
 */
export function fetchSearchResults(query){
    SC_search(query, function(tracks){
        search(tracks);
    });
}

function searchResults(tracks){
    return {type: SEARCH_RESULTS, tracks: tracks};
}