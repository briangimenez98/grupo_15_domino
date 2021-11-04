module.exports = {
    renderQuienesSomos: (req, res) => {
        res.render('quienesSomos');
    },
    renderTerminos: (req, res) => {
        res.render('terminos');
    },
    renderContacto: (req, res) => {
        res.render('contacto');
    },
    renderPreguntas: (req, res) => {
        res.render('preguntas');
    },
    renderCambios: (req, res) => {
        res.render('cambios');
    },
    renderCompra: (req, res) => {
        res.render('compra');
    },
    renderEnvios: (req, res) => {
        res.render('envios');
    }
}