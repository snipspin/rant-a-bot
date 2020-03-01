const messageList = document.querySelector('.msgcontent');
(function() {
    const HOST = location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(HOST);
    const form = document.querySelector('.form');
    //const messageList = document.querySelector('.msgcontent');
    const botName = document.querySelector('#bot-name').textContent;

    // add a button to leave the conversation 
    const leave = document.createElement('li');
    leave.innerHTML = '<a href="/available/list" class="waves-effect waves-light btn">Leave</a>';
    document.querySelector('#mod-menu').appendChild(leave);



    form.onsubmit = function() {
        let input = document.querySelector('.input');
        let text = input.value;
        addMessageToView(text, false);

        ws.send(JSON.stringify({ text: text, bot: botName }));
        input.value = '';
        input.focus();
        messageList.scrollTop = messageList.scrollHeight;
        return false;
    }

    ws.onmessage = function(msg) {
        let response = JSON.parse(msg.data);
        console.log(response);
        addMessageToView(response.messages[response.messages.length - 1].text, true);
    }

    // addMessageToView = function(text, isServer = false) {
    //     let div = document.createElement('div');
    //     div.className = (isServer) ? 'speech-bubble left left-align col s7' : 'speech-bubble right right-align col s7 offset-s5';
    //     div.textContent = text;
    //     messageList.appendChild(div);
    //     messageList.scrollTop = messageList.scrollHeight;
    // }
}());

function addMessageToView(text, isServer = false) {
    //let messageList = document.querySelector('.msgcontent');
    let div = document.createElement('div');
    div.className = (isServer) ? 'speech-bubble left left-align col s7' : 'speech-bubble right right-align col s7 offset-s5';
    div.textContent = text;
    messageList.appendChild(div);
    messageList.scrollTop = messageList.scrollHeight;
}

function someTest() {
    console.log('test of some function');
}

const formatLastChat = (lastChat) => {
    let conversation = JSON.parse(lastChat);
    conversation.messages.forEach(element => {
        console.log(element);
        addMessageToView(element.text, element.from_server);
    });

};