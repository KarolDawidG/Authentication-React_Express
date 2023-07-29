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
const logger = require('./logs/logger');

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
		try {
		  return res.status(200).send('Wczytano główną stronę.');
		} catch (error) {
		  console.error(error);
		  logger.error(error.message);
		  if (error instanceof SyntaxError) {
			logger.error(error.message);
			return res.status(400).send('Nieprawidłowe zapytanie.');
		  } else if (error instanceof ReferenceError) {
			logger.error(error.message);
			return res.status(500).send('Błąd wewnętrzny serwera.');
		  } else {
			return res.status(500).send('Wystąpił nieznany błąd.');
		  }
		}
	  });

app.listen(PORT, ()=>{console.log(`Server Started correctly on port ${PORT}`)});
