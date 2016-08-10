import {likeTrack, unlikeTrack} from '../core/soundcloud/soundCloudSDK';

/*
 * Action types
 */
export const TOGGLE_LIKE_TRACK = 'TOGGLE_LIKE_TRACK';

/*
 * Action creators
 */
export const toggleLikeTrack = (id, liked) => {
    if(liked){
        unlikeTrack(id);
    } else {
        likeTrack(id);
    }
 	return {type: TOGGLE_LIKE_TRACK, id};
}