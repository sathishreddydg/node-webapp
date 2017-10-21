const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Registering header and footer partials folder
hbs.registerPartials(__dirname + '/views/partials');
//Registering common partial varibales
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
//Registering helper to return Uppercase text
hbs.registerHelper('upperCase', (text) => text.toUpperCase());

//Sets the view engine to hbs
app.set('view engine', 'hbs');

//Middleware: Every request will go through this method. We can check for valid users, make changes to requests etc,.
app.use((req, res, next) => {
    var log = `${new Date().toString()} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to write to server.log');
        }
    });
    //If we don't call next(), request will stop here itself. It won't go to below handler methods.
    next();
});
//Middleware: use this middleware whenever there is a maintenance to website
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//Middleware: Directory files can be accessed directly as static pages
//http://localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        name: 'Sathish'
        // getCurrentYear:new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
        // getCurrentYear: new Date().getFullYear()
    });
})

app.listen(3000, () => {
    console.log('Server started at port : 3000');
});