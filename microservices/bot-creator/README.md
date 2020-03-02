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