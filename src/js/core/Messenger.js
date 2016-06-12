
class Messenger extends Core {

    constructor(){
        super();

        this.queue = {};
        this.exists = this.queue.hasOwnProperty;
    }

    subscribe(action, listener){
        // Create the action's object if not yet created
        if(!this.exists.call(this.queue, action)){
            this.queue[action] = [];
        }

        // add the listener to the queue
        var index = this.queue[action].push(listener) - 1;

        // provide a way to remove an action
        return {
            remove: function(){
                delete this.queue[action][index];
            }.bind(this)
        }
    }

    publish(action, data){
        // don't do anything if there are no listeners
        if(!this.exists.call(this.queue, action)){
            return;
        }

        this.queue[action].forEach(function(actionItem){
            actionItem(data != undefined ? data : {});
        });
    }
}