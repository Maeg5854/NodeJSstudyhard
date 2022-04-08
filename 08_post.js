const express = require('express');
const bodyParser = require('body-parser');
var app = express(); // application을 리턴한다.
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views')
app.use(express.static('public')); // public 디렉토리를 정적파일 제공 디렉토리로 지정.
app.use(bodyParser.urlencoded({extended : false}));

// 입력 페이지
app.get('/form', function(req, res){
    res.render('form');
});

// 입력 + GET메소드로 리턴되는 페이지
app.get('/form_receiver', (req, res)=>{
    res.send('Hello get');
});

// 입력 + POST메소드로 리턴되는 페이지
app.post('/form_receiver',(req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ', ' + description);
});

// 07_app.js의 예제를 POST방식으로 변경해보자!
app.post('/topic', function(req, res){

    // 이 부분을 file/DB로 교체하면 나머지는 알아서 잘 작동
    var topics = [
        'javascripts is...',
        'Nodejs is...',
        'Express is... '
    ];
    // 이 부분도 프로그래밍적으로 생성해주도록 바꾸면 현대적인 어플리케이션을 만들 수 있다.
    let output = `
        <a href="/topic/1">JavaScript</a><br>
        <a href="/topic/2">NodeJS</a><br><br>
        <a href="/topic/3">Express</a><br><br>
        ${topics[req.params.id]}
    `
    res.send(output);
});

app.listen(3000,function(){
    console.log('Connected 3000 port1');
});