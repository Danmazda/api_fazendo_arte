import app, { connectToDb } from "./app.js";
app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Server listening on port ${process.env.PORT}`);
});
