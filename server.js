const express = require('express');
const session = require('express-session');
const hbs = require('express-hbs');
const app = express();






  
//resquest to home page 
  app.post('/', function (req, res) {
    res.send('POST ')
  }) 
  // setup a 'route' to listen on the default url path (http://localhost)
  app.get("/", function(req,res){
      res.send("</a>");
  });
  
  app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/');

app.get('/', (req,res) =>{
    res.render('blog', {layout: 'blog'})
});

app.get('/blog', (req,res) =>{
    res.render('blog', {layout: 'blog'})
});

app.get('/article/:id', (req,res) =>{
    res.render('article', {layout: 'article'})
});

app.get('/login', (req,res) =>{
    res.render('login', {layout: 'login'})
});

app.get('/regist', (req,res) =>{
    res.render('register', {layout: 'register'})
});
    });

  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
  // setup http server to listen on HTTP_PORT
  const port = process.env.PORT || 4000;
  const server = app.listen(port, () => {
      console.log('Connected to port ' + port)
  })
  
 
  const user = require('./resigter.routes');

  app.use('/user', user)
  

  const login = require('./login.routes');

  app.use('/login', login)