const { userSchema } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
   const {
      username,
      password,
      email,
      phone,
   } = req.body;

   try {

      const userExists = await User.findOne({ email });

      if (userExists) {
         return res.status(400).json({ message: 'User already exists' });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      await userSchema.create({
         username,
         password: encryptedPassword,
         email,
         phone,
      });

      const accessToken = jwt.sign(
         { _id: userExists._id },
         process.env.JWT_ACCESS_SECRET,
         {
            expiresIn: process.env.JWT_ACCESS_EXPIRY,
         }
      );

      const refreshToken = jwt.sign(
         { _id: userExists._id },
         process.env.JWT_REFRESH_SECRET,
         {
            expiresIn: process.env.JWT_REFRESH_EXPIRY,
         }
      );

      console.log({ accessToken, refreshToken });

      return res.status(201).json({
         message: "Registration successfull",
         data: { token: { accessToken, refreshToken }, user }
      });
   } catch (error) {
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
};

module.exports.signin = async (req, res) => {
   const { usernameORemailORPhone, password } = req.body;
   try {
      const pipeline = [
         {
            $match: {
               $or: [
                  { username: usernameORemailORPhone },
                  { email: usernameORemailORPhone },
                  { phone: usernameORemailORPhone },
               ],
            },
         },
         {
            $project: {
               _id: 1,
               username: 1,
               email: 1,
               phone: 1,
               password: 1,
               is_admin: 1,
               is_verified: 1,
               profile: 1,
               cart: 1,
               wishlist: 1,
               wallet: 1,
            },
         },
      ];

      await userSchema
         .aggregate(pipeline)
         .exec()
         .then((users) => {
            if (users.length === 0) {
               console.log("User not found");
               return res.status(404).json({ message: "user not found" })
            } else {
               const user = users[0];
               bcrypt.compare(password, user.password, (err, result) => {
                  if (err) {
                     console.error("Password comparison error:", err);
                     return res.status(500).json({ message: err?.message })
                  } else if (result) {
                     const accessToken = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_ACCESS_SECRET,
                        {
                           expiresIn: process.env.JWT_ACCESS_EXPIRY,
                        }
                     );

                     const refreshToken = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_REFRESH_SECRET,
                        {
                           expiresIn: process.env.JWT_REFRESH_EXPIRY,
                        }
                     );
                     delete user.password;
                     return res.status(200).json({
                        message: "login successfull",
                        data: { token: { accessToken, refreshToken }, user }
                     });
                  } else {
                     console.log(result);
                     console.log("Incorrect password");
                     return res.status(404).json({ message: "Incorrect password" })
                  }
               });
            }
         });
   } catch (error) {
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
};

module.exports.getCurrentUser = async (req, res) => {
   try {
      const _id = req.decoded._id;
      const currentUser = await userSchema.findOne({ _id });
      if (!currentUser) {
         return res.status(400).json({ message: 'user does not exists' })
      }
      return res.status(200).json({ data: currentUser, message: 'user details fetched successfully' })
   } catch (error) {
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
}