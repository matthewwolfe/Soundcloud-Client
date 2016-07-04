Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const renderer = require('electron').ipcRenderer;

renderer.on('click-play-pause', function(){
    window.messenger.publish('click-play-pause', {});
});

renderer.on('click-next-track', function(){
	window.messenger.publish('click-next-track', {});
});