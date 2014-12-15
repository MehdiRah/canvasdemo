var express = require('express'),
    // stylus = require('stylus'), 
    // nib = require('nib');
var app = express();

app.set('port', (process.env.PORT || 5000));
// function compile(str, path) {
//   return stylus(str)
//     .set('filename', path)
//     .use(nib())
// }
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
// app.use(express.logger('dev'))
// app.use(stylus.middleware(
//   { src: __dirname + '/public'
//   , compile: compile
//   }
// ))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

app.listen(app.get('port'), function() {
  console.log("<Mehdi> log: " + app.get('port'))
})
