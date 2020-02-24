# Eliza Microservice

## Usage

### Step 1 - Start a new conversation

To initialize a new conversation the endpoint expects an empty body 
at the route /v1/conversations via POST 

```
POST /v1/conversations
```

If successfully created the server responses with status code 201 and sets the header 'Location' to the path to the new conversation

```
Location = /v1/conversations/id
```

### Step 2 - Retrieve a message

Use the route that was set in the header 'Location' from step 1 and send a GET request with an empty body

```
GET  /v1/conversations/123
```

You may get a response that looks like this

```javascript
{
    "messages_endpoint": "/v1/conversations/123/messages",
    "messages": [
        {
            "text": "Please tell me what's been bothering you.",
            "from_server": true,
            "timestamp": 12345
        }
    ]
}
```

### Step 3 - Send a message

Use the message_endpoint route retrieved from step 2 and send a message JSON formatted message to it

```json
{
    "message":"Hello Eliza, this is an example of how to send you a message."
}
```

The response is a status code of 201 on success, or 404 if it failed.

To retrieve the the answer from eliza repeat step 2 and get a response like this:

```json
{
    "messages_endpoint": "/v1/conversations/0/messages",
    "messages": [
        {
            "text": "Please tell me what's been bothering you.",
            "from_server": true,
            "timestamp": 12345
        },
        {
            "text": "Hello Eliza, this is an example of how to send you a message.",
            "from_server": false,
            "timestamp": 12356
        },
        {
            "text": "Can you elaborate on that ?",
            "from_server": true,
            "timestamp": 12358
        }
    ]
}
```