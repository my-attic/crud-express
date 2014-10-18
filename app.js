var express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , app = express()
  , http_port = 3000
  , uuid = require('node-uuid')
  , humans = [
      {id: uuid.v1(), name:"Bob"}
    , {id: uuid.v1(), name:"John"}
  ];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get("/about", function(req, res) {
  res.send({message:"Hello World!"});
});

// Liste de tous les humans
app.get("/humans", function(req, res) {
  res.send(humans);

});

// Obtenir un human par son id
app.get("/humans/:id", function(req, res) {
  var human = humans.filter(function(human) { return human.id == req.params.id; })[0];
  res.send(human);
});

// Supprimer un human par son id
app.delete("/humans/:id", function(req, res) {
 //... foo
});

// Ajouter un human
app.post("/humans", function(req, res) {
  var human = req.body;
  human.id = uuid.v1();
  humans.push(human);
  res.statusCode = 301;
  res.header("location", "/humans/"+human.id).end();
});

// Modifier un human
app.put("/humans/:id", function(req, res) {
 //... foo
});

app.listen(http_port);
console.log("Listening on " + http_port);
