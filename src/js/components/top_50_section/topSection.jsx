import React from 'react';
import { connect } from 'react-redux';

import { setTop50Kind, setTop50Genre, getTracks } from '../../actions/top50';

const TopSection = (props) => {
    return (
        <div id="top-50-section">
            <select onChange={(e) => props.setKind(e.target.value)} value={props.kind}>
                <option value="top">Top 50</option>
                <option value="trending">Trending</option>
            </select>

            <select onChange={(e) => props.setGenre(e.target.value)} value={props.genre}>
                <option value="all-music">All music genres</option>
                <option value="alternativerock">Alternative Rock</option>
                <option value="ambient">Ambient</option>
                <option value="classical">Classical</option>
                <option value="country">Country</option>
                <option value="danceedm">Dance & EDM</option>
                <option value="dancehall">Dancehall</option>
                <option value="deephouse">Deep House</option>
                <option value="disco">Disco</option>
                <option value="drumbass">Drum & Bass</option>
                <option value="dubstep">Dubstep</option>
                <option value="electronic">Electronic</option>
                <option value="folksingersongwriter">Folk & Singer-Songwriter</option>
                <option value="hiphoprap">Hip-hop & Rap</option>
                <option value="house">House</option>
                <option value="indie">Indie</option>
                <option value="jazzblues">Jazz & Blues</option>
                <option value="latin">Latin</option>
                <option value="metal">Metal</option>
                <option value="piano">Piano</option>
                <option value="pop">Pop</option>
                <option value="rbsoul">R&B & Soul</option>
                <option value="reggae">Raggae</option>
                <option value="reggaeton">Raggaeton</option>
                <option value="rock">Rock</option>
                <option value="soundtrack">Soundtrack</option>
                <option value="techno">Techno</option>
                <option value="trance">Trance</option>
                <option value="trap">Trap</option>
                <option value="triphop">Triphop</option>
                <option value="world">World</option>
            </select>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        kind: state.top50.kind,
        genre: state.top50.genre
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setKind: (kind) => {
            dispatch(setTop50Kind(kind));
            getTracks();
        },
        setGenre: (genre) => {
            dispatch(setTop50Genre(genre));
            getTracks();
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopSection);