export function convertDuration(millis){
    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000); 
    return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
}

export function isEmpty(object){
    return Object.keys(object).length === 0 && object.constructor === Object;
}

export function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}