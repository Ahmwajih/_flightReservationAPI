const User = require("../models/users");
const Token = require("../models/token");
const pwEncrypt = require("../helpers/pwEncrypt");
const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");
const token = require("./token");

require("dotenv").config();

module.exports = {
  Login: async (req, res) => {
    // swagger tags
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     tags:
     *       - Auth
     *     description: Login to the application
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: Username to use for login.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: login
     *         schema:
     *           $ref: '#/definitions/User'
     *       500:
     *         description: Internal server error
     */
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ username }] });
    console.log(`User found: ${user}`);

   if (username && password) {
      if (user && user.password === pwEncrypt(password)) {
        console.log(`Encrypted password: ${pwEncrypt(password)}`);
        console.log(`Stored password: ${user.password}`);
        if (user.isActive) {
          res.send({
            error: false,
            token: setToken(user),
          });
        } else {
          res.status(401).send({
            error: true,
            message: "user not active",
          });
        }
      } else {
        res.status(401).send({
          error: true,
          message: "username or password is incorrect",
        });
      }
    }
  },

  refresh: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'JWT: Refresh'
        #swagger.description = 'Refresh accessToken with refreshToken'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                bearer: {
                    refresh: '...refreshToken...'
                }
            }
        }
    */

    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      try {
        const jwtData = await jwt.verify(refreshToken, process.env.REFRESH_KEY);

        const { id, password } = jwtData;

        if (id && password) {
          const user = await User.findOne({ _id: id });

          if (user && user.password == password) {
            if (user.isActive) {
              // JWT AccessToken:
              const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_KEY,
                { expiresIn: "30m" }
              );

              res.status(200).send({
                error: false,
                bearer: {
                  access: accessToken,
                },
              });
            } else {
              res.status(401).send({
                error: true,
                message: "This account is not active.",
              });
            }
          } else {
            res.status(401).send({
              error: true,
              message: "Wrong id or password.",
            });
          }
        } else {
          res.status(401).send({
            error: true,
            message: "There is not id and password in refreshToken.",
          });
        }
      } catch (error) {
        res.status(401).send({
          error: true,
          message: "Invalid refresh token.",
        });
      }
    } else {
      res.status(401).send({
        error: true,
        message: "Please enter token.refresh",
      });
    }
  },

  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "SimpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */

    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[1]) {
      const tokenData = await Token.deleteOne({ token: tokenKey[1] });

      res.send({
        error: false,
        message: "Logout was OK.",
        data: tokenData,
      });
    } else {
      res.status(401).send({
        error: true,
        message: "Invalid token.",
      });
    }
  },
};
