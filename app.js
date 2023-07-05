if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require("stripe")(stripeSecretKey)
const nodemailer = require("nodemailer")

const fs = require('fs')
var express = require('express');
var cors = require('cors')
var app = express();
var port = 8000
var bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
      origin: "http://0.0.0.0:80",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});

app.enable('trust proxy');
app.set('view engine', 'views')
app.use(express.static('public'))

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

io.on('connection', (socket) => {
  socket.on('chat message', function(data) {
    io.sockets.emit('chat message', { id:data.username, message: data.message});
  });
});

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'jacobcampbell.ca@gmail.com',
      pass: 'ukrluzybjqipwqzr',
  }
};
var transporter = nodemailer.createTransport(smtpConfig);

app.get('/shop', function(req, res) {
    fs.readFile('items.JSON', function(error, data) {
      if(error) {
        res.status(500).end()
      } 
      else {
        res.render('shop.ejs', {
          items: JSON.parse(data),
          top: 45
        })
      }
    })
})

app.post('/getTracks', function(req, res) {
  const dir = 'public/music';
  fs.readdir(dir, (err, files) => {
    res.send(JSON.stringify(files.length));
  });
})

app.post('/myapi', async function (req, res) {
      var incomingInformation = req.body;
      var cart = JSON.parse("[" + incomingInformation.cart + "]");
      var thisDescription = JSON.stringify(cart);
      var info = JSON.parse(incomingInformation.info)
      var custAddress = JSON.stringify(info[2]);
      var custEmail = JSON.stringify(info[3])
      var custCity =JSON.stringify(info[4]);
      var custState = JSON.stringify(info[5]);
      var custCountry = JSON.stringify(info[6]);
      var custPostal = JSON.stringify(info[7]);
      var custPhone = JSON.stringify(info[8]);
      var customerName = info[0] + " " + info[1];
      
      var finalPrice = 0;
      for(var i = 0; i < cart.length; i++) {
          if(cart[i][0] == 1) {
              finalPrice += 1600000;
          }
          else if(cart[i][0] == 2) {
            finalPrice += 6249900;
        }
      }
      

      try {

        const paymentIntent = await stripe.paymentIntents.create({
          amount: finalPrice,
          description: thisDescription,
          shipping: {
            address: {
              line1: custAddress,
              city: custCity,
              state: custState,
              country: custCountry,
              postal_code: custPostal
            },
            name: customerName,
            phone: custPhone,
          },
          currency: "CAD",
          automatic_payment_methods: {
            enabled: true,
          },
          
        });

        

        res.send(JSON.stringify({finalPrice: finalPrice, stripePublicKey: stripePublicKey, clientSecret: paymentIntent.client_secret}))   

      }
      catch(e) {
        console.log(e.message)
      }

})

app.post('/sendMessage', function (req, res) {
  var incomingInformation = req.body;
  console.log(incomingInformation)

  transporter.sendMail(incomingInformation, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send();

})

server.listen(port, "0.0.0.0", function() {
  console.log('Listening to port:  ' + port);
});




