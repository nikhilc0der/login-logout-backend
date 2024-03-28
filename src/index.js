import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port} is running`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });

app.get("/", (req, res) => {
  res.send(`<a href="/twitter">twitter</a>`);
});

app.get("/twitter", (req, res) => {
  res.send("<h1>Hello twitter!</h1>");
});
