const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials'); //absolute directory
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next(); //if middleware does not call next then application never continues
});

app.use((req, res, next) => {
  res.render('maintenace.hbs', {
    pageTitle: 'Maintenace'
  })
});

app.use(express.static(__dirname + '/public')); //Middleware to serve static file

//HELPER function
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//handler for HTTP request
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>'); //sends this back

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  })
});

app.get('/about', (req, res) => {
  // res.send('About page');

  res.render('about.hbs', {
    pageTitle: 'About Page',
  }); //render about.hbs (DEFAULT folder for hbs is views)
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); //binds the application to a port on our machine
