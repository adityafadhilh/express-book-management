require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');

app.use(cors());
app.use(express.json());


app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server has been started at port ${port}`);
});