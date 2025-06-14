import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import userRoutes from '../server/src/routes/userRoutes';

dotenv.config(); 

const app = express();

// ======== Static Files ========
app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/favicon.ico'));
});

// ======== Middleware ========
app.use(cors());
app.use(express.json());

// ======== Routes ========
app.use('/api/users', userRoutes);

// ======== Server ========
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
