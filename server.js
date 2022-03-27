const path = require("path");
const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/cors-options");

const rootRouter = require("./routes/root");
const employeesRouter = require("./routes/api/employees");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/employees", employeesRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);

app.all("*", (req, resp) => {
  resp.status(404);

  if (req.accepts("html")) {
    resp.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    resp.json({ err: "404 Not Found" });
  } else {
    resp.type("txt").json({ err: "404 Not Found" });
  }
});

app.use(errorHandler);

app.listen(PORT, console.log(`listening on port ${PORT}...`));
