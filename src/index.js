const express = require('express');
const taskRouter = require('./routes/tasks.route')
const app = express();

const PORT = process.env.PORT || 30000;

app.use(express.json());

app.use('/api/tasks', taskRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
    res.status(404).json({success: false, message: 'Route not found'})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
});