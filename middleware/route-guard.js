const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/profile')
  }
  console.log('There was a current user')
  next()
}

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/profile')
  }
  next()
}

module.exports = {
  isLoggedIn,
  isLoggedOut,
}
