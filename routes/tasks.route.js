/** =====================================================================
 *  TASKS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { getTasks, postTask, putTask, getTaskId } = require('../controllers/tasks.controller');

const router = Router();

/** =====================================================================
 *  GET TAKS
=========================================================================*/
router.get('/', validarJWT, getTasks);

/** =====================================================================
 *  GET TAKS ID
=========================================================================*/
router.get('/:id', validarJWT, getTaskId);

/** =====================================================================
 *  POST TAK
=========================================================================*/
router.post('/', [
        validarJWT,
        check('client', 'El cliente es obligatorio').isMongoId(),
        validarCampos
    ],
    postTask
);

/** =====================================================================
 *  PUT TAK
=========================================================================*/
router.put('/:id', validarJWT, putTask);


module.exports = router;