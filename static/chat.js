(function() {
    const HOST = location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(HOST);
    
    const form = document.querySelector('.form');
  
    form.onsubmit = function() {
      let input = document.querySelector('.input'); 
      let text = input.value;
      addMessageToView(text, false);
      ws.send(text);
      input.value = '';
      input.focus();
      return false;
    }
    
    ws.onmessage = function(msg) {
      let response = JSON.parse(msg.data);
      console.log(response);
      addMessageToView(response.messages[response.messages.length-1].text, true);
    }

    addMessageToView = function(text, isServer = false) {
      let messageList = document.querySelector('.messages');
      let li = document.createElement('li');
      li.textContent = text;
      messageList.appendChild(li);
    }
  }());