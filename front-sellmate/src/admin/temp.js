// CONTROLLERS

// USERS

const router = require("../routes/users");
const User = require("../models/users");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.profile = user; //profile change kore user kora chhilo first e
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined; //this will not be sent
  req.profile.salt = undefined; // this will not be sent

  return res.json(req.profile);
};

exports.update = (req, res) => {
  console.log("user update", req.body);
  req.body.role = 0; // role will always be 0
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

POSTS;

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Posts = require("../models/posts");

exports.postById = (req, res, next, id) => {
  Posts.findById(id)
    .populate("memer")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: "Someone file missing case! Meme not found :(",
        });
      }
      req.post = post;
      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { title, memer } = fields;

    if (!title || !memer) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let post = new Posts(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        console.log("POST CREATE ERROR ", err);
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  Posts.findOne()
    .populate("memer", "name")
    .select("_id title photo memer createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let post = req.post;
    post = _.extend(post, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      deletedPost,
      message: "Post deleted successfully",
    });
  });
};

exports.photo = (req, res) => {
  Posts.findOne()
    .select("photo")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err,
        });
      }
      res.set("Content-Type", post.photo.contentType);
      return res.send(post.photo.data);
    });
};

AUTH;

const router = require("../routes/auth");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // For Authorization Check
const User = require("../models/users");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken by possibly by a normie",
      });
    }
    const { name, email, password } = req.body;

    let newUser = new User({ name, email, password });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({
        success,
        message:
          "A very successful SignUp. * Insert the success kid meme here *",
      });
    });
  });
};

exports.signin = (req, res) => {
  //Finding the user based on Email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Oh No! We can't find you with that email.",
      });
    }

    //if user is found, check email and password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email or password didn't match",
      });
    }

    //generate a signed token in user id

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //cookies with expiry date. t is the token here.
    res.cookie("t", token, { expire: new Date() + 9999 });

    //Token to front end client

    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Successfully signed out" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAdmin = (req, res, next) => {
  //if the role is 0, which means user, then deny. Need this to protect admin resources
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denied!",
    });
  }
  next();
};

ROUTES;

users;
const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin } = require("../controllers/auth");
const { updatez } = require("lodash");

//THIS.CONTROLLER
const { userById, read, update } = require("../controllers/users");

router.get("/user/:userId", read);
router.put("/user/:userId", requireSignin, update);

router.param("userId", userById);

module.exports = router;

auth;
const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  isAdmin,
  requireSignin,
} = require("../controllers/auth");

const { userSignUpVaidator } = require("../validators");

router.post("/signup", userSignUpVaidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;

POSTS;
const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/users");

// THIS.CONTROLLER
const {
  postById,
  create,
  read,
  remove,
  update,
  photo,
} = require("../controllers/posts");

router.post("/post/create/:userId", requireSignin, create);
router.get("/post/:postId", read);
router.put("/post/update/:postId/:userId", requireSignin, update);
router.delete("/post/delete/:postId/:userId", requireSignin, remove);
router.get("/post/meme/:postId", photo);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;

MODELS;

POSTS;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      max: 200,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    memer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postSchema);

User;
const _ = require("lodash");
const mongoose = require("mongoose");
const crypto = require("crypto"); //To Hash The Password
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
      unique: true,
    },

    hashed_password: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: "What about me? 🤔",
      trim: true,
    },

    salt: String,

    role: {
      type: Number,
      required: true,
      default: 0,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

//virtual Fields

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);

APP.js;

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

//Route imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
//app
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"));

//middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
//Port

const port = process.env.PORT | 8000;

app.listen(port, function () {
  console.log(`The app is running at port ${port}`);
});
