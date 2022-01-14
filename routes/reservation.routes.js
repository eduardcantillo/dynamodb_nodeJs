const { Router } = require("express");
const { listar } = require("../controller/listar");
const { obtenerPorId } = require("../controller/obtenerPorId");
const {guardarReserva} =require('../controller/saveLocalizaObjects')

const router = Router();

router.post('/',guardarReserva);
router.get('/',listar);
router.post('/obtener',obtenerPorId)

module.exports = router;