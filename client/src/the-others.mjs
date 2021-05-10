import { _interactiveGroupChat } from './group-chat.mjs';

let _this = undefined

export class TheOthers extends Map {
    constructor() {
        super();
        _this = this
        this.set_listeners = []
        this.delete_listeners = []
        this.oneonone_listeners = []
        this.me = {}
    }

    get(userId) {
        return super.get(userId)
    }

    updateMe(me) {
        this.me = { ...this.me, ...me }
        if (this.me.userId && this.me.initialized) {
            setTimeout(() => {
      /*          _this.spinner.classList.remove("spinner-start");
                _this.spinner.classList.add("spinner-stop");
                _interactiveGroupChat.classList.remove("interactive-group-chat-hidden");
                _interactiveGroupChat.classList.add("interactive-group-chat-visible");
            */    }, 1800);
        } else
            if (this.me.userId) {
                setTimeout(() => {
      /*           _this.spinner.classList.remove("spinner-start");
                _this.spinner.classList.add("spinner-stop");
                _interactiveGroupChat.classList.remove("interactive-group-chat-hidden");
                _interactiveGroupChat.classList.add("interactive-group-chat-visible");
            */    }, 2400);
            }
    }

    set(userId, theOther) {
        console.log(`add theother ${userId} ${JSON.stringify(theOther)}`)
        super.set(userId, theOther);
        /*so a new "theOther" was added, now update the ui's using it that are registered*/
        this.set_listeners.forEach(createCallback => createCallback(theOther))
    }

    delete(userId) {
        /*so an "theOther" was disconnected, now update also the related video containers*/
        super.delete(userId)
        this.delete_listeners.forEach(removeCallback => removeCallback(userId))
    }

    getSenders() {
        return Array.from(this.values()).filter(theOther => theOther.rtpSender.track.kind === 'video').map(theOther => theOther.rtpSender)
    }

    addSetListener(listener) {
        this.set_listeners.push(listener)
    }

    removeSetListener(listener) {//only called when a complete menu option is removed (destroyed)
        this.set_listeners = this.set_listeners.filter(item => item != listener);
    }

    addDeleteListener(listener) {
        this.delete_listeners.push(listener)
    }

    removeDeleteListener(listener) {//only called when a complete menu option is removed (destroyed)
        this.delete_listeners = this.delete_listeners.filter(item => item != listener);
    }

    addOneOnOneListener(listener) {
        this.oneonone_listeners.push(listener)
    }

    actionOnOneOnOne(payload) {
        this.oneonone_listeners.forEach(callback => callback(payload));
    }

    initMe(me) {
        this.me = me;
    }

}

let theOthers = null;
export function getTheOthers() {
    if (theOthers == null)
        theOthers = new TheOthers();
    return theOthers;
}

