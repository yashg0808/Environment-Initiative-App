import express from 'express'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import  healthcheckRoute  from './routes/healthcheck.route.js'
import  userRoutes  from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const httpServer = createServer(app);

app.use(express.static("public")); // configure static file to save images locally

app.use("/api/v1/healthcheck", healthcheckRoute);

// Routes required:
// api/user
app.use("/api/v1/user", userRoutes);
// api/profile
// api/initiatives
// api/actions
// api/posts
// api/challenges
// api/map




export { httpServer };