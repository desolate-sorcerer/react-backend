import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import { default as ConnectMongoDBSession } from 'connect-mongodb-session';
import router from './routes/users.js';
import cors from 'cors';


const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;
const secret = process.env.SECRET;
const app = express();
const MongoStore = ConnectMongoDBSession(session);

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
})
);

app.set('trust proxy', 1);

let store = new MongoStore({
  uri: MONGOURL,
  collection: 'session-store'
});

store.on('err', (err) => {
  console.log(err);
});

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  store: store
}));

app.use(router)

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`db is connected succesfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  })
  .catch((err) => console.log(err));
