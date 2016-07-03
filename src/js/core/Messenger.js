
class Messenger {

    constructor(){
        this.queue = {};
        this.exists = this.queue.hasOwnProperty;
    }

    subscribe(action, listener): Object {
        // Create the action's object if not yet created
        if(!this.exists.call(this.queue, action)){
            this.queue[action] = [];
        }

        // add the listener to the queue
        var index = this.queue[action].push(listener) - 1;

        // provide a way to remove an action
        return {
            remove: function(): void {
                delete this.queue[action][index];
            }.bind(this)
        }
    }

    publish(action, data): void {
        // don't do anything if there are no listeners
        if(!this.exists.call(this.queue, action)){
            return;
        }

        this.queue[action].forEach(function(actionItem){
            actionItem(data != undefined ? data : {});
        });
    }
}