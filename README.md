# rant-a-bot
[ToC]
## The problem being solved
You had a bad day and just want to get something off your chest but there’s nobody around who cares to listen?

Rant a bot allows you to rant about delicate topics without being judged by the person to whom you’re speaking.

## Targeted user

The target group consists of those who are looking for a quick and easy way to rant about any topic over text, even if it might be a delicate topic of which they rather not talk about to someone else.

## Scope

### MVP
- rant-a-bot utilizes at least 2 APIs and has 2 or
   more chat partner to choose from.
- A user can sign up, sign in and sign out.
- To chat with a bot a user doesn't need to be signed in.

### Stretch goals
- create new bots on demand (endless scrolling)
- maintain a list of favorite bots
- use different rulesets for eliza or different chat bots

## Wireframes

![](https://i.imgur.com/T13ggEF.png)
>landing page
>

![](https://i.imgur.com/WtXMwb2.png)
> landing page with modal
> 

![](https://i.imgur.com/rVg7dCU.png)
> overview available bots to chat with
> 

![](https://i.imgur.com/f66G7EZ.png)
> chat view
> 


## Planning

The planning started mainly with the chat bot and accomplishing a stable way of communication.

As chat bot the following node package is used [elizabot](https://www.npmjs.com/package/elizabot)

![](https://i.imgur.com/oH370u4.png)
> - 1 Client sends chat message to Webserver 
> - 2 Webserver writes message to database
> - 3 Webserver sends clinets message to Chatbot
> - 4 Chatbot sends answer to Webserver
> - 5 Webserver writes Chatbots answer to database
> - 6 Webserver sends Chatbots answer to client
> 

### User stories

The following user stories were defined to determine the products functionality.

- [x] a user can talk to a bot
- [x] there is a list of bots to look at
- [x] a user can choose to talk with one of the bots from that list
- [x] as a user I can sign up, sign in and sign out
- [x] it is possible to leave a conversation
- [x] a user can see their chat history

## How to use the product

![](https://i.imgur.com/oNLsj6V.jpg)
At first a user sees the front page which allows the user to create a new account, or to sign in if they already have an account, but it is not required to have an account to use the product.

![](https://i.imgur.com/1III61b.png)
> A user can sign up for a new account

![](https://i.imgur.com/48MZNYp.png)
> Or a user can sign in with their credentials

![](https://i.imgur.com/8cnn7w6.jpg)
> As a signed in user there is a menu bar

![](https://i.imgur.com/yLsNiZn.jpg)
> After clicking on "RANT NOW" on the front page or "BOTS" in the menu bar a user can pick a bot to talk with 

![](https://i.imgur.com/igTAkJN.png)
> After clicking on the chat bubble of each bot, a conversation with that bot will be initiated

![](https://i.imgur.com/29lSAk6.png)
> A user can also view the profiles of bots and other real users
> 
![](https://i.imgur.com/9bIy3fv.png)
> but only if they are signed in

![](https://i.imgur.com/7fYQHNE.png)
> Also an account can be edited or deleted
> 


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

# bot-creator microservice
This microservice creates new bots and stores them into the database.

## Usage

To create a single new bot send an empty post request to
the route /create

```
POST /create
```
> creates a single new bot

Or create multiple bots via the bulk route /create/bulk/amount

```
POST /create/bulk/10
```
> creates ten new bots

## Services used
[To get a bots user image](https://thispersondoesnotexist.com/)
[To get an advice](https://api.adviceslip.com/advice)
[To get a random user name](http://names.drycodes.com/1?nameOptions=all)

# Technologies

- node
- axios
- bcrypt
- cloudinary
- dotenv
- elizabot
- express
- express-ejs-layouts
- express-session
- express-ws
- passport
- pg
- sequelize
- HTML 5
- CSS
- Materialize CSS
- Javascript

# Resources
[Materialize CSS](https://materializecss.com/)
> A great starting point to dive into materialize for web sites
> 

[cloudinary](https://cloudinary.com/)
> Store images or transform them with the help of a well documented API
> 

