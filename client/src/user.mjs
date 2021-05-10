import faker from "faker";
faker.locale = "nl";

function getFakeName() {
    return faker.name.firstName()
}

const develop = true

export class User {

    static get styles() {
        return css` 
        #errorMessages {
            height: 5rem;
            background: var(--color-whiteish);
            font-size: 1.5rem;
        }`;
    }

    constructor(room, userName) {
        this.room = room;
        this.userName = userName;
        this.video = undefined;
    }

    static loginDialog(parent) {
        const errorMessages = parent.appendChild(document.createElement("pre"));
        errorMessages.id = "errorMessages";
        errorMessages.innerText = "errors";

        let me = undefined

        if (develop) {
            me = new User("blablaRoom", getFakeName());
        } else {
            let room = getParam('room', "Give a room", "BlaBlaRoom");
            let name = getParam('user', "BlaBlaRoom", "PietjePuk");
            me = new User(room, name);
        }

        errorMessages.parentNode.removeChild(errorMessages);//startup was ok
        changeWebsiteTitle();
        return me;

        function changeWebsiteTitle() {
            const webSiteTitle = document.getElementsByTagName("title")[0];
            webSiteTitle.innerText = me.userName + " using kafka.academy's  Interactive Tutorial";
        }

        function getParam(param, txt, _default) {
            for (; ;) {
                const result = window.prompt(txt, _default);
                if (result == null)
                    createErrorMessage("no " + param + " specified")
                else return result
            }
            function createErrorMessage(_msg) {
                const el = document.getElementById("errorMessages");
                el.innerHTML += _msg + "<br>";
            }
        }
    }
}