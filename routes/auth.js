const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { SALT } = process.env;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Please complete all information." });
  const salt = await bcrypt.genSalt(parseInt(SALT));
  const hash = await bcrypt.hash(req.body.password, salt);
  const newU = {
    ...req.body,
    password: hash,
  };
  const u = new User(newU);
  u.save()
    .then((data) => {
      res.status(200).json({ message: "Registration Successful!" });
    })
    .catch((err) =>
      err.code === 11000
        ? res.status(401).json({ message: "That Username Is Already Taken" })
        : console.log(err)
    );
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user || !user.enabled)
        return res.status(400).json({ message: "Username Not Found" });
      bcrypt.compare(password, user.password).then((didMatch) => {
        console.log(password, user.password, didMatch);
        if (didMatch)
          return res.status(200).json({ message: "login successful" });
        else
          return res.status(400).json({
            message: "Username and Password Did Not Match Any Known User",
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "An Error Occurred, Please Try Logging In Again" });
    });
});
module.exports = router;
