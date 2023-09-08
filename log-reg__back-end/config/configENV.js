
// const PASS = 'sbxuilwsxwdrhdjl';
// const USER = 'karoldawidg@gmail.com';
// const HOST_DB = 'localhost';
// const NAME_DB = 'dziennik';
// const USER_DB = 'root';
// const PASS_DB = '';
// const PORT = 3001;
// const JWT_SECRET= 'sekretnyklucz4847474';
// const JWT_CONFIRMED_TOKEN = 'jdkvi89393unvu3u3jf*&*HGgdgdgd53y8383hdhhaalpfifjfhchxmsk8344hy7f8f0fifjfhg';
// const service = 'gmail';
// const REACT_APP_SECRET_KEY = '6LfeZQcoAAAAADBozX0SsIwOSnx8zWxLmvqqns4J';


// module.exports = {
//     PASS,
//     USER,
//     HOST_DB,
//     NAME_DB,
//     USER_DB,
//     PASS_DB,
//     PORT,
//     JWT_SECRET,
//     JWT_CONFIRMED_TOKEN,
//     service,
//     REACT_APP_SECRET_KEY
// };


require('dotenv').config();


module.exports = {
    pass: process.env.PASS,
    user: process.env.USER,
    hostDB:process.env.HOST_DB,
    nameDB:process.env.NAME_DB,
    userDB:process.env.USER_DB,
    passDB:process.env.PASS_DB,
    PORT:process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
    JWT_CONFIRMED_TOKEN:process.env.JWT_CONFIRMED_TOKEN,
    service:process.env.service,
    REACT_APP_SECRET_KEY:process.env.REACT_APP_SECRET_KEY
    
};

