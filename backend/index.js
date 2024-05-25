import 'dotenv/config'
import connectDB from './db/init.js';
import { httpServer } from './app.js';

try {
    await connectDB();
    httpServer.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
} catch (err) {
    console.log("Mongo db connect error: ", err);
}