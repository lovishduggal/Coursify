import app from './app.js';
import { connectDB } from './Config/database.js';
connectDB();
app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`);
});