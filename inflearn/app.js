
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

/* app 설정 */  
let app = express();
app.set('views', './views_app');        // 뷰 디렉토리
app.set('view engine', 'jade');         // 뷰 엔진
app.locals.pretty = true;               // HTML 들여쓰기

app.use(bodyParser.urlencoded({extended:false})); // body-parser 사용

/* 라우팅 */

// 토픽을 추가하는 페이지
app.get('/topic/new', function(req,res){
    res.render('new');
});

// 토픽을 추가하는 Request
app.post('/topic', function(req,res){
    let title = req.body.title;
    let description = req.body.description;
    
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');
    });
});

// 토픽의 내역을 조회하는 Request
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});    
    });
    
});

// 토픽의 세부내용을 조회하는 Request
app.get('/topic/:id', function(req, res){
    let id = req.params.id;
    
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id, 'utf8', function(err, data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view',{topics:files, title:id, description:data});
        });   
    });
});


app.listen(port, function(){
    console.log('Connected, '+String(port));
});