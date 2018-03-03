const User = require('../models/user'); // Import User Model Schema
const jwt = require('jsonwebtoken');
const config = require('../config/database'); 

module.exports = (router) => {
  /* ==============
     Register Route
  ============== */
  router.post('/register', (req, res) => {
    // Check if email was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if username was provided
      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' }); // Return error
        } else {
          // Create new user object and apply user input
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          // Save user to database
          user.save((err) => {

            // Check if error occured
            if (err) {
              console.log(err);

              // Check if error is an error indicating duplicate account
               if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
               } else {
                // Check if error is a validation rror
                  if (err.errors) {
                    // Check if validation error is in the email field
                      if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message }); // Return error
                      } else {
                        // Check if validation error is in the username field
                          if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); // Return error
                          } else {
                          // Check if validation error is in the password field
                            if (err.errors.password) {
                              res.json({ success: false, message: err.errors.password.message }); // Return error
                            } else {
                            res.json({ success: false, message: err }); // Return any other error not already covered
                            }
                          }
                        }
                   } else {
                      res.json({ success: false, message: 'Could not save user. Error: ', err });
                      console.log(err);// Return error if not related to validation
                   }
              }
            } else {
              res.json({ success: true, message: 'Account registered!' });
              console.log('Account registered!') // Return success
            }
          });
        }
      }
    }
  });

  /*
    Route to check if user's email is available for registration
  */
 router.get('/checkEmail/:email', (req, res) => {
   // Check if email was provided in paramaters
   if (!req.params.email) {
     res.json({ success: false, message: 'E-mail was not provided' }); // Return error
   } else {
     // Search for user's e-mail in database;
     User.findOne({ email: req.params.email }, (err, user) => {
       if (err) {
         res.json({ success: false, message: err }); // Return connection error
       } else {
         // Check if user's e-mail is taken
         if (user) {
           res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
         } else {
           res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
         }
       }
     });
   }
 });



  /*
     Route to check if user's username is available for registration
   */
  router.get('/checkUsername/:username', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
      // Look for username in database
      User.findOne({ username: req.params.username }, (err, user) => {
        // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's username was found
          if (user) {
            res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
          } else {
            res.json({ success: true, message: 'Username is available' }); // Return as vailable username
          }
        }
      });
    }
  });

  /* ========
  LOGIN ROUTE
  ======== */
  router.post('/login', (req, res) => {
    // Check if username was provided
    console.log("In authentication");
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        console.log("connecting and trying to check");
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                console.log("Success!!!!");
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                res.json({
                  success: true,
                  message: 'Success!',
                  token: token,
                  user: {
                    username: user.username
                  }
                }); // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });

  return router; // Return router object to main index.js
}