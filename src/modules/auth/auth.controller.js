// PLACEHOLDER CODE!!!!
//No usar!

// const bcrypt = require('bcrypt');
// const login = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ where: { email } });
//         if (!user) throw new AppError('Credenciales incorrectas', 401);

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) throw new AppError('Credenciales incorrectas', 401);

//         const accessToken = generateAccessToken(user);
//         const refreshToken = generateRefreshToken(user);

//         user.refreshToken = refreshToken;
//         await user.save();

//         res.json({ accessToken, refreshToken });
//     } catch (err) {
//         next(err);
//     }
// };

// module.exports = {
//     login,
// };
