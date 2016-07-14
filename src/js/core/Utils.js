Array.prototype.remove = function(){
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function isEmpty(object){
    return Object.keys(object).length === 0 && object.constructor === Object;
}

const node = {
    fs: require('fs'),
    electron: require('electron'),
    renderer: require('electron').ipcRenderer,
    request: require('request')
};

node.renderer.on('click-play-pause', function(){
    window.messenger.publish('click-play-pause', {});
});

node.renderer.on('click-next-track', function(){
	window.messenger.publish('click-next-track', {});
});