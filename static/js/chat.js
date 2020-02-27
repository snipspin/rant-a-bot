(function() {
    const HOST = location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(HOST);
    
    const form = document.querySelector('.form');
    const messageList = document.querySelector('.msgcontent');
    form.onsubmit = function() {
      let input = document.querySelector('.input'); 
      let text = input.value;
      addMessageToView(text, false);
      ws.send(text);
      input.value = '';
      input.focus();
      messageList.scrollTop = messageList.scrollHeight;
      return false;
    }
    
    ws.onmessage = function(msg) {
      let response = JSON.parse(msg.data);
      console.log(response);
      addMessageToView(response.messages[response.messages.length-1].text, true);
    }

    addMessageToView = function(text, isServer = false) {
      
      let div = document.createElement('div');
      // div.className = "bubble right-align";
      div.className = (isServer)? 'speech-bubble left left-align col s7' : 'speech-bubble right right-align col s7 offset-s5';
      div.textContent = text;
      console.log(div);
      messageList.appendChild(div);
      messageList.scrollTop = messageList.scrollHeight;
    }
  }());