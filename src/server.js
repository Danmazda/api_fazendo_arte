import app, { connectToDb } from "./app.js";
app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("server listening on port 3000");
});
