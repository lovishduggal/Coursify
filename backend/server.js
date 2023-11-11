import app from './app.js';

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening on ${process.env.PORT || 3001}`);
});
