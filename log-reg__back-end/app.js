const express = require('express');
const app = express();
const PORT = 3001;
const {limiter} = require('./config/config');
const middleware = require("./config/middleware");
const logRoute = require('./routes/userRoute/loginRoute');
const adminRoute = require('./routes/adminRoute/adminRoute');
const regRoute = require('./routes/userRoute/registerRoute');
const logoutRoute = require('./routes/userRoute/logoutRoute');
const usersRoute = require('./routes/adminRoute/usersRoute');
const updateRole = require('./routes/adminRoute/updateRole');
const resetRoute = require('./routes/userRoute/passwordReset');

app.use('/register', regRoute );
app.use('/auth', logRoute );
app.use('/admin', adminRoute );
app.use('/logout', logoutRoute);
app.use('/users', usersRoute );
app.use('/update-role', updateRole );
app.use('/reset', resetRoute);

app.use(limiter);
app.use(middleware);

app.get('/', (req, res) => {
	res.status(200).send('Wczytano główna strone.');
});

app.listen(PORT, ()=>{console.log(`Server Started correctly on port ${PORT}`)});
