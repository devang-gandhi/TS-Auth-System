import express from 'express';
import mongoose from 'mongoose';
import routes from '../src/routers/userRoutes';

const app = express();
app.use(express.json());

app.listen(3001, ()=>console.log('server says hello...'));
mongoose.connect('mongodb://localhost:27017', ()=>console.log('Database connected..'));

app.use('/', routes);

