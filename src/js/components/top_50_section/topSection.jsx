import React from 'react';

class TopSection extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            kind: 'top',
            genre: 'all-music'
        };
    }

    kindChange(e){
        this.setState({kind: e.target.value}, function(){
            this.pushChanges();
        }.bind(this));
    }

    genreChange(e){
         this.setState({genre: e.target.value}, function(){
            this.pushChanges();
         }.bind(this));
    }

    pushChanges(){
        window.messenger.publish('top-section-change',
            {
                kind: this.state.kind,
                genre: this.state.genre
            }
        );
    }

    render(){
        return (
            <div id="top-50-section">
                <select onChange={this.kindChange.bind(this)}>
                    <option value="top">Top 50</option>
                    <option value="trending">Trending</option>
                </select>

                <select onChange={this.genreChange.bind(this)}>
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
    }
}

export default TopSection;