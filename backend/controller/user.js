// const express = require("express");
// const path = require("path");
// const User = require("../model/user");
// const router = express.Router();
// const { upload } = require("../multer");
// // const cloudinary = require("cloudinary");
// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const sendMail = require("../utils/sendMail");
// const sendToken = require("../utils/jwtToken");
// const { isAuthenticated } = require("../middleware/auth");

// // create user
// // router.post("/create-user", upload.single("file"), async (req, res, next) => {
// //   try {
// //     const { name, email, password, avatar } = req.body;
// //     const userEmail = await User.findOne({ email });

// //     if (userEmail) {
// //       const filename = req.file.filename;
// //       const filepath = `uploads/${filename}`;
// //       fs.unlink(filepath, (err) => {
// //         if (err) {
// //           console.log(err);
// //           res.status(500).json({ message: "Error delecting file" });
// //         }
// //         // else {
// //         //       res.json({ message: "/File delected successfully" });
// //         //     }
// //       });
// //       return next(new ErrorHandler("User already exists!", 400));
// //     }

// //     const filename = req.file.filename;
// //     const fileUrl = path.join(filename);

// //     // if (userEmail) {
// //     //   return next(new ErrorHandler("User already exists", 400));
// //     // }

// //     // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
// //     //   folder: "avatars",
// //     // });

// //     const user = {
// //       name: name,
// //       email: email,
// //       password: password,
// //       // avatar: {
// //       //   public_id: myCloud.public_id,
// //       //   url: myCloud.secure_url,
// //       // },
// //       avatar: fileUrl,
// //     };

// //     const activationToken = createActivationToken(user);

// //     const activationUrl = `http://localhost:3000/activation/${activationToken}`;

// //     try {
// //       await sendMail({
// //         email: user.email,
// //         subject: "Activate your account",
// //         message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
// //       });
// //       res.status(201).json({
// //         success: true,
// //         message: `Please check your email:- ${user.email} to activate your account!`,
// //       });
// //     } catch (error) {
// //       return next(new ErrorHandler(error.message, 500));
// //     }
// //   } catch (error) {
// //     return next(new ErrorHandler(error.message, 400));
// //   }
// // });

// // create user activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
// };

// // activate user
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activationToken } = req.body;

//       const newUser = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newUser) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }

//       const { name, email, password, avatar } = newUser;

//       let user = await User.findOne({ email });

//       if (user) {
//         return next(new ErrorHandler("User  already exists", 400));
//       }

//       user = await User.create({
//         name,
//         email,
//         avatar,
//         password,
//       });

//       sendToken(newUser, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );
// module.exports = router;

const User = require("../model/user");

const createUser = async () => {
  try {
    const { name, email, password, selectedFile } = req.body;
    const requiredFields = ["name", "email", "password", "selectedFile"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const users = await User.create({
      name,
      email,
      password,
      selectedFile,
    });

    if (selectedFile && selectedFile.path && selectedFile.type) {
      if (typeof selectedFile.path === "string") {
        try {
          users.selectedFile.data = fs.readFileSync(selectedFile.path);
          users.selectedFile.contentType = selectedFile.mimetype;
        } catch (error) {
          console.error("Error reading the selectedFile file:", error);
        }
      } else {
        console.erroe("Error: photo.path must be a valid string");
      }
    } else {
      console.error("Error: image, image.path, and image.typemust be defined");
    }

    await users.save();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
};
