const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://maeg:aowl0254mongo@localhost:27017/admin', {
        dbName : 'nodejs',
        useNewUrlParser : true,
    }, (err) => {
        if (err) {
            console.log('몽고디비 연결 에러', err);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};

mongoose.connection.on('error', (error)=> {
    console.error('몽고디비 연결 에러입니다.', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니디. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;
