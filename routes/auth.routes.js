const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model')


// const salt = bcrypt.genSaltSync(saltRounds);
// const hash1 = bcrypt.hashSync(plainPassword1, salt);

// routes/auth.routes.js

const { Router } = require('express');
const req = require('express/lib/request');
const router = new Router();
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard')

// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));




router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
   // make sure users fill all mandatory fields:
   try {
if (!username || !email || !password) {
res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
return;
      }
 const salt = await bcrypt.genSaltSync(12);
 const hashpass = await bcrypt.hashSync(password, salt);
 const authPass = {username, email, password:hashpass}   
     const newUser = await User.create(authPass);
     res.redirect('/profile')
} catch (error) {
    console.log('error creating a new user', error);
}
});

router.get('/login', (req, res) => res.render('auth/login'));




router.post('/login', async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  console.log('SESSION =====> ', req.session);

if (!email || !password) {
  return res.render('auth/login', {
    errorMessage: 'Please enter both, email and password to login.'
  });
}

User.findOne({ email })
  .then(user => {
    console.log('user database', user)
    if (!user) {
      res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user
      res.redirect('/profile')
      

    } else {
      res.render('auth/login', { errorMessage: 'Incorrect password.' });
    }
  })
  .catch(error => next(error));
});

router.get('/profile', isLoggedIn, (req, res) => {

  res.render('users/profile', { userInSession: req.session.currentUser })
 
})



// routes/auth.routes.js
// ... imports and both signup routes stay untouched


  
  // userProfile route and the module export stay unchanged
  

module.exports = router;