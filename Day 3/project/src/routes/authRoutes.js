const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const user = await User.create(name, email, phoneNumber, password);
    req.session.userId = user.id;
    res.redirect("/books");
  } catch (error) {
    console.log(error);
    res.render("register", { error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.isAdmin = true;
      return res.redirect("/books");
    }

    const user = await User.findByEmail(email);
    if (user && (await User.verifyPassword(password, user.password))) {
      req.session.userId = user.id;
      res.redirect("/books");
    } else {
      res.render("login", { error: "Invalid credentials" });
    }
  } catch (error) {
    res.render("login", { error: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
