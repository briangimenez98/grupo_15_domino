const express = require('express');
const app = express()
const path = require('path')
const port = 3030;
app.use(express.static('public'));

app.get('/',(req,res)=> res.sendFile(path.join(__dirname, 'views' ,'home.html')));
app.get('/detalle',(req,res) => res.sendFile(path.join(__dirname, 'views', 'detalle.html')));
app.get('/carrito',(req,res) => res.sendFile(path.join(__dirname, 'views', 'carrito.html')));
app.listen(port, ()=> console.log(`Server running in port ${port}`));

