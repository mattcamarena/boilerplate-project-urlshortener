require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// My Solution
var urlLinks = [];
app.post('/api/shorturl', (req,res)=>{

  var bodyUrl = req.body.url; 
  var splitUrl = bodyUrl.split("//",2);

  if(splitUrl[0] == "http:" || splitUrl[0] == "https:"){
    if(!urlLinks.includes(bodyUrl)){
      urlLinks.push(bodyUrl);
    }
    res.json({original_url: bodyUrl, short_url: urlLinks.indexOf(bodyUrl)});

  }else{
    res.json({error: 'invalid url'});
  }

})

app.get('/api/shorturl/:shortUrl?',(req,res)=>{
  var shortUrl = req.params.shortUrl;
  if(Number.isInteger(parseInt(shortUrl))){
    res.redirect(urlLinks[shortUrl])
  }else{
    res.json({error: "wrong format"});
  }
  
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
