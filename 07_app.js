const express = require('express');
var app = express(); // application을 리턴한다.

app.use(express.static('public')); // public 디렉토리를 정적파일 제공 디렉토리로 지정.

app.get('/dynamic', function(req, res){
    var lis = '';
    for (var i=0; i<5 ;i++){
        lis = lis + '<li>coding</li>';
    }
    var output = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>
                my homepage
            </title>
            <body>
                hello, static!
                ${lis}
            </body>
        </head>
    </html>`;
    res.send(output);
});
app.get('/', function(req, res){
    res.send('hello router,<img src="시간표.png">'); // public 디렉토리 내의 정적 파일을 바로 접근한다.
});

app.listen(3000,function(){
    console.log('Connected 3000 port1');
});