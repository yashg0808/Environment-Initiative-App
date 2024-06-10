import express from 'express'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import  healthcheckRoute  from './routes/healthcheck.route.js'
import  userRoutes  from './routes/user.routes.js'
import  profileRoutes  from './routes/profile.routes.js'
import  postRoutes  from './routes/post.routes.js'
import  likeRoutes  from './routes/like.routes.js'
import  followRoutes  from './routes/follow.routes.js'
import  commentRoutes  from './routes/comment.routes.js'
import  bookmarkRoutes from './routes/bookmark.routes.js'
import  initiativeRoutes from './routes/initiative.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cookieParser());

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === "*"
          ? "*" 
          : process.env.CORS_ORIGIN?.split(","),
      credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const httpServer = createServer(app);

app.use(express.static("public")); // configure static file to save images locally


app.get("/", (req, res) => {
  // print all the cors origin
  res.json({
    message: "Welcome to the API",
    cors: process.env.CORS_ORIGIN?.split(","),
  });

})


app.use("/api/v1/healthcheck", healthcheckRoute);

// Routes required:
// api/user
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/bookmark", bookmarkRoutes);
app.use("/api/v1/initiative", initiativeRoutes);
// api/profile
// api/initiatives
// api/actions
// api/posts
// api/challenges
// // api/map
app.get("/", (req, res) => { res.send(`frontend url: ${process.env.CORS_ORIGIN}`) });

export { httpServer };