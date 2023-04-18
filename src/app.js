const express = require("express");
const port = 8080;
const app = express();
const {Server} = require('socket.io')
const handlebars = require('express-handlebars')
const mongoConnect = require('../db/index')
const router = require('./routes/index')
const Message = require('./dao/models/messages.models')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//parametros handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

mongoConnect ()
router(app)

const httpServer = app.listen(port, async() => { 
   console.log(`Server listening on ${port}`);
});
const io = new Server(httpServer)
const realTimeProductsRouter = require('./routes/realTimeProducts.js');
app.use('/api/realTimeProducts', realTimeProductsRouter(io))

io.on('connection', socket => {
   console.log('Cliente conectado');
   Message.find().then((messages) => {
      socket.emit('old messages', messages);
    });

    socket.on('send message', (data) => {
      const message = new Message({
        user: data.user,
        message: data.message
      });
      message.save().then(() => {
        io.emit('new message', message);
      });
    });
   io.emit('mensajeServidor', 'Hola desde el servidor')
})

