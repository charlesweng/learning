import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as createError from "http-errors";
import * as logger from "morgan";
import * as path from "path";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// view engine setup
/* const ejs = require("ejs").__express; */
/* app.set("views", path.join(__dirname, "views")); */
/* app.set("view engine", "ejs"); */
/* app.engine(".ejs", ejs) */
/* app.use(express.static(path.join(__dirname, "public"))); */

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: any) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
