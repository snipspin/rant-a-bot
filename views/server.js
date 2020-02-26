require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');

const app = express();
// const expressWs = require('express-ws')(app);

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.urlencoded({ extended: false }));
//app.use(express.static(__dirname + "/public"));

// app.use(function (req, res, next) {
//     console.log('middleware');
//     req.testing = 'testing';
//     return next();
//   });
   
//   app.get('/', function(req, res){
//     //console.log('get route', req.testing);
//     res.render('index',{});
//     //res.end();
//   });
   
//   app.ws('/', function(ws, req) {
//     ws.on('message', function(msg) {
//       console.log(msg);
//     });
//     console.log('socket', req.testing);
//   });

app.get('/*', (req,res) => {
    res.render('chat');
});

app.listen(process.env.RANT_A_BOT_SERVER_PORT || 3000);
module.exports = app;