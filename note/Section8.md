# Ch8. POST 방식을 이용한 정보의 전달

* GET 방식
- 웹브라우저에 어떤 URL을 이용해서 정보를 가져오는 방식
- URL에 쿼리스트링을 포함한 것도 GET (가져오는 정보에 대한 조건을 준 방식)

* POST 방식
- 사용자의 정보를 서버에 전송하는 시나리오도 있음. EX. 로그인, 글쓰기 등
- 이럴 때는 POST를 사용한다.

### POST방식을 통한 정보의 전달 : form
* **jade**에서의 입력 기능 태그
    * `input`: 한 줄 짜리 텍스트 입력
    * `textarea`: 여러 줄 텍스트 입력
        - `name`태그 : 입력의 ID
    * `input`: 사용자의 입력에 따라 요청을 시작함.
    * `form` : 입력(`input` OR  `textarea`)과 요청(`input`)을 묶어서 Request를 생성
        - 기본적으로 `form`은 **GET**방식으로 요청을 보낸다.
        - `method`속성: 요청에 사용되는 메소드를 설정한다. 
``` jade
doctype html 
html 
    head 
        meta(charset='utf-8')
    body
        form(action='/form_receiver')
            p 
                input(type='text', name='title')
            p 
                textarea(name='description')
            p
                input(type='submit')
```
```
http://localhost:3000/form_receiver?title=hello&description=world
```
* Javascript 파일에서는 GET, POST방식으로 보내진 요청(req)에 대해서 어떻게 응답할 지 정의한다.
* GET방식이 URL에 정보를 담고 있는 것과 달리, POST 방식은 `req.body`에 정보를 담고 있는데, 이를 **파싱**해야 javascript 상에서 사용할 수 있다. => **body-parser**
* **body-parser** : 아래 예제와 같이 사용했을 때, 서버로 들어오는 요청(`req`) 중 **POST**방식으로 들어온 요청을 파싱해서 `req.body`객체를 생성해 컨트롤러로 전달하는 *미들웨어*
```javascript
app.use(bodyParser.urlencoded({extended : false}));

// 입력 + POST메소드로 리턴되는 페이지
app.post('/form_receiver',(req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ', ' + description);
});
```

### GET과 POST용도
- 정보에 대한 주소를 나타낼때는 URL에 모든 정보를 포함해야한다.
- GET방식의 경우 사용자가 입력한 민감 정보까지 URL에 입력되는 한계가 있음 => *URL에 정보가 드러나지 않는* POST방식을 사용해야한다.
    - 그러나 POST방식이 보안적으로 훨씬 나은게 아님. 다른 보안체계도 필요하다.
- 사용자가 전달하는 정보의 길이가 너무 많거나 길 경우에는 URL 길이에 한계가 있다 => 정보를 Body라는 길이 제한이 없는 POST방식을 사용해야한다.