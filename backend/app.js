const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const errorMiddleware = require("./middleware/error");

const app = express();

// CORS setup
app.use(
  cors({
    origin: "https://quiz-phi-neon.vercel.app", // Adjust your frontend URL
     //origin: "http://localhost:3000", // Adjust your frontend URL
    credentials: true,
  })
);

// EJS setup for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware setup
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use("/backend/uploads", express.static(path.resolve(__dirname, "../backend/uploads")));
app.use(cookieParser());
app.use(express.json());

// Session setup
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot", // Change secret for production
    resave: false,
    httpOnly: true,
    saveUninitialized: false,
  })
);

// Flash messages setup
app.use(flash());

// Import routes
const blogs = require("./routes/blogRoute");
const quizzes = require("./routes/quizRoute");
const courses = require("./routes/courseRoute");
const pages = require("./routes/pageRoute");
const categories = require("./routes/categoryRoute");
const user = require("./routes/userRoute");
const settings = require("./routes/settingRoute");
const faqs = require("./routes/faqRoute");
const testimonials = require("./routes/testimonialRoute");
const contact = require("./routes/contactRoute");
const feature = require("./routes/featureRoute");
const block = require("./routes/blockRoute");

// Admin routes
app.use("/admin", user);
app.use("/admin", blogs);
app.use("/admin", quizzes);
app.use("/admin", categories);
app.use("/admin", courses);
app.use("/admin", pages);
app.use("/admin", settings);
app.use("/admin", faqs);
app.use("/admin", testimonials);
app.use("/admin", feature);
app.use("/admin", block);

// API routes (version 1)
app.use("/api/v1", user);
app.use("/api/v1", blogs);
app.use("/api/v1", quizzes);
app.use("/api/v1", categories);
app.use("/api/v1", courses);
app.use("/api/v1", pages);
app.use("/api/v1", settings);
app.use("/api/v1", faqs);
app.use("/api/v1", testimonials);
app.use("/api/v1", contact);
app.use("/api/v1", feature);
app.use("/api/v1", block);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
