module.exports = {
    index : (req, res) => {
        res.render('home');
    },
    detail : (req, res) => {
        res.render('detalle');
    }, 
    carrito : (req, res) => {
        res.render('carrito.ejs')
    }
}