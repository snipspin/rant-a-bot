const ElizaBot = require('elizabot');

function eliza() {
    this.elizaInstances = {},
    this.createInstance = () => {
        const elizaInstance = new ElizaBot();
        const initial = elizaInstance.getInitial();
        elizaInstance.memSize = 20; // (default: 20)
        elizaInstance.reset();        
        let key = Object.keys(this.elizaInstances).length;
        let messages = [];
        messages.push(this.createMessageFromServer(initial));
        this.elizaInstances[key] = {eliza: elizaInstance, messages: messages};
        return key
    },
    this.hasInstance = (id) => {
        return this.elizaInstances.hasOwnProperty(id);
    },
    this.getMessagesForConversation = (id) => {
        if (this.hasInstance(id)) {
            return this.elizaInstances[id].messages;
        } else {
            return -1;
        }
    }
    this.sendMessage = (id, message) => {
        if (this.hasInstance(id)) {
            this.elizaInstances[id].messages.push({ text: message, from_server: false, timestamp: Date.now()});
            let response = this.elizaInstances[id].eliza.transform(message);
            this.elizaInstances[id].messages.push(this.createMessageFromServer(response));
            return response;
        } else {
            return -1;
        }
    },
    this.createMessageFromServer = (text) => {
        return { text: text, from_server: true, timestamp: Date.now()};
    }
}
module.exports = new eliza();