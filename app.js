const express = require("express");
const path = require("path");
const app = express();
const churchRouter = require("./routes/church/church");
const adminRouter = require("./routes/admin/admin");
const upload = require("express-fileupload");
const flash = require("connect-flash");
const session = require("express-session");
const mongoClient = require("connect-mongo")(session);

app.use(upload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "mendsalbertlovestocode",
    store: new mongoClient({ client: require("./db") }),
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  res.locals.error = req.flash("error");
  res.locals.user = req.session.user;
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");
app.set("veiws", "views");
app.use("/", churchRouter);
app.use("/admin", adminRouter);
module.exports = app;
