const express = require("express");
const app = express();
const PORT = 3001;
const { limiter, errorHandler } = require("./config/config");
const middleware = require("./config/middleware");
const logRoute = require("./routes/userRoute/loginRoute");
const adminRoute = require("./routes/adminRoute/adminRoute");
const regRoute = require("./routes/userRoute/registerRoute");
const logoutRoute = require("./routes/userRoute/logoutRoute");
const usersRoute = require("./routes/adminRoute/usersRoute");
const resetRoute = require("./routes/userRoute/resetRoute");
const forgotRoute = require("./routes/userRoute/forgotPassRoute");
const capRoutes = require("./routes/captchaRoute/capRoute");

// quiz
const quizeRoute = require("./routes/quizeRoute/quizeRoute");
const quize20Route = require("./routes/quizeRoute/quize20Route");
const createTableRoute = require('./routes/createTableRoute/createTableRoute');

const MESSAGES = require("./config/messages");
const STATUS_CODES = require("./config/status-codes");
const logger = require("./logs/logger");

app.use("/register", regRoute);
app.use("/auth", logRoute);
app.use("/admin", adminRoute);
app.use("/logout", logoutRoute);
app.use("/users", usersRoute);
app.use("/reset", resetRoute);
app.use("/forgot", forgotRoute);
app.use("/cap", capRoutes);
app.use("/quiz", quizeRoute);
app.use("/quiz-20", quize20Route);
app.use("/create-table", createTableRoute)

app.use(middleware);
app.use(limiter);
app.use(errorHandler);

app.get("/", (req, res) => {
  return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
});

app.listen(PORT, () => {
  logger.info(`${MESSAGES.SERVER_STARTED} ${PORT}`);
});
