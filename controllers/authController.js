const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const generateToken = require("../config/generateToken");
const HttpError = require("../models/http-error");

exports.registerUser = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors.errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your email and password must be greater than 6.",
        422
      )
    );
  }

  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password) {
    return next(new HttpError("Please enter all required fields", 400));
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const error = new HttpError(
          "User exists already, please login instead.",
          422
        );
        return next(error);
      }
      bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
          const newUser = new User({
            displayName: displayName,
            email: email,
            password: hashedPw,
          });
          return newUser.save();
        })
        .then((createdUser) => {
          res.status(201).json({
            userId: createdUser._id,
            displayName: createdUser.displayName,
            email: createdUser.email,
            token: generateToken(createdUser._id),
          });
        })
        .catch((err) => {
          const error = new HttpError(
            "Could not create user,please try again.",
            500
          );
          return next(error);
        });
    })
    .catch((err) => {
      const error = new HttpError(
        "Could not create user,please try again.",
        500
      );
      return next(error);
    });
};

exports.authUser = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new HttpError(
          "Invalid credentials, could not log you in.",
          401
        );
        return next(error);
      }
      res.json({
        userId: loadedUser._id,
        email: loadedUser.email,
        displayName: loadedUser.displayName,
        token: generateToken(loadedUser._id),
      });
    })
    .catch((err) => {
      const error = new HttpError("Logging in failed, please try again.", 500);
      return next(error);
    });
};
