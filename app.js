(() => {
    let element = (id) => {
        return document.getElementById(id);
    }
    //Get element
    let status = element('status')
    let messages = element('messages')
    let textarea = element('textarea')
    let username = element('username')
    let clearBtn = element('clear')


    // Set default status

    let statusDefault = status.textContent;

    let setStatus = function (s) {
        //Set Status 

        status.textContent = s;

        if (s !== statusDefault) {
            let delay = setTimeout(() => {
                setStatus(statusDefault);
            }, 4000);
        }
    }
    //Connect to socket.io

    let socket = io.connect('http://127.0.0.1:8080/becodemessenger');

    //Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...')

    }
})();