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
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === "*"
          ? "*" // This might give CORS error for some origins due to credentials set to true
          : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
      credentials: true,
    })
);
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
// api/profile
// api/initiatives
// api/actions
// api/posts
// api/challenges
// api/map




export { httpServer };