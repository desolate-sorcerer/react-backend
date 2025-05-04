import userModel from '../models/user.js';
import foodModel from '../models/food.js'
import bcryptjs from 'bcryptjs';

const addUser = (async (req, res) => {
  const { email, password, username } = req.body;
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  const user = new userModel({
    name: username,
    password: hash,
    email: email
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ succes: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const login = (async (req, res) => {
  try {

    const user = await userModel.findOne({ email: req.body.email });
    if (user && await bcryptjs.compare(req.body.password, user.password)) {
      req.session.visited = true;
      req.session.user = user;
      await req.session.save();
      res.json({ succes: true });
    }
    else {
      res.status(404).json({ message: "wrong credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await userModel.findById(req.params.id);
    if (user == null) {
      res.status(404).json({ message: "could not find user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

const api = (async (req, res) => {
  try {
    const data = await foodModel.find();
    res.json(data);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const session = (req, res) => {
  res.json(req.session.user || {});
}

const logout = ((req, res) => {
  try {
    req.session.user = null;
    req.session.destroy();
    res.json({ succes: true });
  }
  catch (err) {
    res.json(err);
  }
});

const search = (async (req, res) => {
  try {
    const query = req.query.q;
    const results = await foodModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
      ]
    }).limit(10);
    res.json(results);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

export default {
  addUser,
  getUser,
  login,
  api,
  session,
  logout,
  search
};
