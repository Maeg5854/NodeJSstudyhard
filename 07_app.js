const express = require('express');
var app = express(); // application을 리턴한다.

app.get('/', function(req, res){
    res.send();
});

app.listen(3000,function(){
    console.log('Connected 3000 port1');
});