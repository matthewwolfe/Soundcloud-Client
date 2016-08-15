/*
 * Variables
 */
let queue = [];
let shuffleQueue = [];

/*
 * Export Functions
 */
export function set(tracks){
    queue = tracks;
}

export function get(){
    return queue;
}

export function shift(){
    get().shift();
}

export function remove(id, index){
    if(queue[index] !== undefined && queue[index] === id){
        get().splice(index, 1);
    }
}

function copy(array){
    return array.map((trackID) => trackID);
}

function shuffle(){
    shuffleQueue = copy(queue);
    var currentIndex = shuffleQueue.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = shuffleQueue[currentIndex];
        shuffleQueue[currentIndex] = shuffleQueue[randomIndex];
        shuffleQueue[randomIndex] = temporaryValue;
    }
}