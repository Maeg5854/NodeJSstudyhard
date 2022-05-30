
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

/* app 설정 */  
let app = express();

// 토픽을 추가하는 Request
app.get('/content', function(req,res){
    let cid = req.params.cid;
    
    res.json({
        isSuccess: true,
        code : 200,
        message : "좋은 통신이었다..",
        result:{
            content: {
                title: "노블레스",
                like: true,
                description: "이것이 너와 나의 눈높이다."
            }
        }     
    })
});

app.listen(port, function(){
    console.log('Connected, '+String(port));
});