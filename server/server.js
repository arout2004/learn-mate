const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otp");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const lectureRoutes = require("./routes/lecture");
const contentRoutes = require("./routes/content");
const videoRoutes = require("./routes/video");
const purchaseRoutes = require("./routes/purchase");
const sendEmail = require("./services/email");
const fetchUser = require("./middlewares/fetchUser");
const grantAccess = require("./middlewares/grantAccess");

const app = express();
const port = process.env.PORT || 9000;

const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? process.env.FRONTEND_URL_DEV
    : process.env.FRONTEND_URL_PROD;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

connectToMongo();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

const User = require("./models/User");
require("./models/Token");
require("./models/Category");
require("./models/Course");
require("./models/Lecture");
require("./models/Content");
require("./models/Video");
const Purchase = require("./models/Purchase");
const Contact = require("./models/Contact");

app.get("/api/users", fetchUser, grantAccess("readAny","profile"), async(req, res)=> {
  let success = false;
  try {
    const users = await User.find({role: "student"}).select("-password -createdAt -updatedAt");

    let data = users?.map((obj)=> {
      return {
        _id: obj?._id,
        name: obj?.name,
        email: obj?.email,
        dp: obj?.dp,
        role: obj?.role
      }
    });

    for(let user of data) {
      const purchases = await Purchase.find({user: user?._id?.toString()}).populate({
       path: "course",
       populate: {
        path: "category",
        model: "Category",
       },
      });
      user["purchases"] = purchases;
    }

    success = true;
    return res.status(200).json({success, users: data});
  } catch (error) {
    return res.status(500).json({success, error: error.message});
  }
});

app.get("/api/contacts", fetchUser, async (req, res)=> {
  let success = false;
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if(role !== "admin") {
      return res.status(401).json({success, error: "Not allowed"});
    }
    
    const contacts = await Contact.find().sort("-createdAt");

    success = true;
    return res.status(200).json({success, contacts});
  } catch (error) {
    return res.status(500).json({success, error: error.message});
  } 
});

app.post("/api/contacts", async (req, res)=> {
  let success = false;
  try {
    const {name, email, subject, message} = req.body;

    await Contact.create({
      name,
      email,
      subject,
      message
    });

    await sendEmail({subject, email: "ar6861273@gmail.com", text: `Name: ${name}\n Email: ${email}\n Message: ${message}`});

    const contacts = await Contact.find().sort("-createdAt");

    success = true;
    return res.status(200).json({success, contacts});
  } catch (error) {
    return res.status(500).json({success, error: error.message});
  } 
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/videos", videoRoutes);

app.use("/api/purchases", purchaseRoutes);

app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
});


module.exports = app;