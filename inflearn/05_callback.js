// 콜백을 사용하는 대표적인 함수 : array.sort()
let a=[3,1,2];

function b(v1, v2){return 0};

a.sort(b);
console.log(a);

// 콜백을 사용하는 함수를 정의한다.
function a(callback){
    callback();
}
