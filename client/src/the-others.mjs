import { _interactiveGroupChat } from './video-container.mjs';

export class TheOthers extends Map {
    constructor() {
        super();
        this.me = {}
        this.set_listeners = []
        this.delete_listeners = []
        this.oneonone_listeners = []
    }

    get(userId) {
        return super.get(userId)
    }

    updateMe(me) {
        this.me = { ...this.me, ...me }      
    }

    set(userId, theOther) {
        console.log(`add theother ${userId} ${JSON.stringify(theOther)}`)
        super.set(userId, theOther);
        /*so a new "theOther" was added, now update the ui's using it that are registered*/
        console.log("set the other 2")
        this.set_listeners.forEach(createCallback => console.log(createCallback))
        this.set_listeners.forEach(createCallback => createCallback(theOther))
        
        console.log("set the other 2")
    
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
}

let theOthers = null;
export function getTheOthers() {
    if (theOthers == null)
        theOthers = new TheOthers();
    return theOthers;
}

