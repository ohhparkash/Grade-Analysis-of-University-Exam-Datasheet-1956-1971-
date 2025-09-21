import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.use('/api', indexRouter);

// Error handling for EADDRINUSE
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
        process.exit(1);
    } else {
        throw err;
    }
});
