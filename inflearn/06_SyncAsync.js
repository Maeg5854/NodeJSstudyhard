const fs = require('fs');

// sync
console.log(1);
let data = fs.readFileSync('data.txt', {encoding:'utf-8'});
console.log(data);

// async
console.log(2);
fs.readFile('data.txt', {encoding:'utf-8'}, function(err, data){
    console.log(3);
    console.log(data);
});
console.log(4);