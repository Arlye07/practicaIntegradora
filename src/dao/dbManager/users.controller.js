const { Router } = require('express')
const Users = require('../models/users.models')

const router = Router()

router.post('/', async (req, res) => {
    try {
      const { first_name, last_name, email, age, password } = req.body
  
      // Verificar si el usuario es admin
      let role = 'usuario'
      if (email === 'admin@gmail.com' && password === 'admin') {
        role = 'administrador'
      }
  
      const newUserInfo = {
        first_name,
        last_name,
        email,
        age,
        password,
        role,
      }
  
      const user = await Users.create(newUserInfo)
  
      res.status(201).json({ status: 'success', message: user })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ status: 'error', error: 'Internal server error' })
    }
  })

  router.get('/', (req, res) => {
    try {
      res.render('signup.handlebars')
    } catch (error) {
      res.status(400).json({error: error})
    }
  })

module.exports = router