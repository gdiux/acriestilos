/** =====================================================================
 *  MACHINES ROUTER
=========================================================================*/
const { Router } = requiere('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { getMachines, postMachine, putMachine } = require('../controllers/machines.controller');

const router = Router();

/** =====================================================================
 *  GET MACHINES
=========================================================================*/
router.get('/', validarJWT, getMachines);

/** =====================================================================
 *  POST MACHINES
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postMachine
);

/** =====================================================================
 *  PUT MACHINES  putMachine
=========================================================================*/
router.put('/:id', validarJWT, putMachine);


module.exports = router;