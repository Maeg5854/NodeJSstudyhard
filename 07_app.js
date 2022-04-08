const express = require('express');
var app = express(); // application을 리턴한다.
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views')
app.use(express.static('public')); // public 디렉토리를 정적파일 제공 디렉토리로 지정.

// app.get('/topic', function(req, res){
app.get('/topic/:id', function(req, res){

    // 이 부분을 file/DB로 교체하면 나머지는 알아서 잘 작동
    var topics = [
        'javascripts is...',
        'Nodejs is...',
        'Express is... '
    ];
    // 이 부분도 프로그래밍적으로 생성해주도록 바꾸면 현대적인 어플리케이션을 만들 수 있다.
    let output = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">NodeJS</a><br><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.params.id]}
    `
    res.send(output);
});
app.get('/form', function(req, res){
    res.render('form');
});

app.get('/template', function(req, res){
    res.render('temp', {time:'Hello', title_:'This is the moment'});
});
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