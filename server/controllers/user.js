app.get('/user', 
  passport.authenticate('jwt', { session: false }), 
  function(req,res,next) {
    res.redirect('/#/user')
})
app.post('/user',
  passport.authenticate('jwt', { session: false }), 
  function(req,res,next) {
    res.send()
})
