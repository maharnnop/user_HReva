const User = require("../models").User;
const bcrypt = require('bcryptjs')
require('dotenv').config()
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = process.env.secretkey
const expiresTime = "12 hours"

const signup = (req, res) => {
  const password = req.body.Password
  // rsaltes.json({msg:req.body.password})
  bcrypt.hash(password, saltRounds,
    function (err, hash) {
      // console.log(process.env.saltRounds);
      if (err) {
        res.sendStatus(401)
      }
      else {
        req.body.Password = hash
        // res.json(req.body)
        User.create(req.body)
          .then((newUser) => {
            const token = jwt.sign(
              {
                EmployeeID: newUser.EmployeeID
              },
              secretKey,
              {
                expiresIn: expiresTime,
              }
            );
            res.json({ jwt: token });
          })
          .catch((err) => {
            res.sendStatus(409);
          });
      }
    });




};

const login = (req, res) => {
  User.findOne({
    where: {
      EmployeeID: req.body.EmployeeID
      // user: req.body.user
    }
  })
    .then(foundUser => {
      if (foundUser === null) {
        return res.sendStatus(404)
      } else {
        if (foundUser) {
          bcrypt.compare(req.body.Password, foundUser.Password, function (err, result) {
            if (err) {
              return res.status(501).json({ errors: [{ msg: "invalid database" }] });
            }
            else if (result === true) {
              const token = jwt.sign(
                {
                  EmployeeID: foundUser.EmployeeID,
                  // user: req.body.user 
                },
                secretKey,
                {
                  expiresIn: expiresTime,
                }
              )
              res.json({ "jwt": token })
            }
            else {
              return res.status(409).json({ errors: [{ msg: "invalid credential" }] });
            }
          });

        }
      }
    }).catch((err) => {
      res.sendStatus(404).json({ errors: [{ msg: "Not found user" }] });
    });
}

// const logout = (req, res) => {
//     res.json({"jwt": null})
// }

const test = (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });

}

const validate = (req, res) => {

  // Define the JWT secret
  // const jwtSecret = 'your_jwt_secret_here';

  // Define the JWT token to be validated
  const token = req.body.token;

  // Verify the JWT token and decode its payload
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      // Invalid token
      return res.status(409).json({ errors: [{ msg: "JWT validation error" }] });
    } else {
      // Valid token
      res.json({ "JWT payload": decoded });

    }
  });

}
module.exports = {
  signup,
  login,
  test,
  validate
  // logout
};
