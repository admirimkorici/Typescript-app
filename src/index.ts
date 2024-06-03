import express, { Request, Response, Express } from 'express';
import db, { YourData } from './database';

const app: Express = express();
const port = 8000;

// Endpoint to get data from the database
app.get('/api/data', async (req: Request, res: Response) => {
    try {
        const data: any = await db.query<any>('SELECT * FROM Posts');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
