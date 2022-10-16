const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // if there is any undefined, then throw an error
  if (!name || !email || !password || !pic) {
    res.status(400);
    throw new Error("Please enter all the Fields");
  }

  const userExists = await User.findOne({ email });
  // if email is not unique, then throw the error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // getting successfully user
  if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic
    })
  }
  else{
    res.status(400);
    throw new Error("Failed to Create the User")
  }
});

module.exports = {registerUser}
