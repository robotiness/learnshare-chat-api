const app = require('express')();
const http = require('http').Server(app);
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const socketioOptions = {cors: {origin: "*"}};
const io = require("socket.io")(http,socketioOptions);
const db = process.env.MONGO_URI || require("./config/secret").MONGO_TESTING_URI;
const PORT = process.env.PORT || require("./config/secret").PORT;
const firebaseAdmin = require('firebase-admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

var serviceAccount = require("./config/utilo-edu-firebase-adminsdk-auzkz-010df0b588.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://utilo-edu.firebaseio.com"
});
  // Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

io.on('connection', function(socket){
  console.log('con')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// app.get('/',function(req,res){
//   res.send('test')
// });

http.listen(PORT, function(){
  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlistening on *:' + PORT);
});
