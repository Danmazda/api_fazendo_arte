import app, {connectToDb} from './app.js';
app.listen(3000, ()=>{
  connectToDb();
  console.log('server listening on port 3000');
});