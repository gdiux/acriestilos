/** =====================================================================
 *  STEPS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { postStep, putStep, getStepsTask, postNotesStep } = require('../controllers/steps.controller');

const router = Router();

/** =====================================================================
 *  GET STEPS
=========================================================================*/
router.get('/task/:task', validarJWT, getStepsTask);

/** =====================================================================
 *  POST STEPS
=========================================================================*/
router.post('/', [
        validarJWT,
        check('staff', 'Se debe asignar un staff').isMongoId(),
        check('task', 'Se debe asignar una tarea').isMongoId(),
        validarCampos
    ],
    postStep
);

/** =====================================================================
 *  POST NOTES IN PREVENTIVE
=========================================================================*/
router.post('/notes/:id', [
        validarJWT,
        check('note', 'El comentario es olbigatorio').not().isEmpty(),
        validarCampos
    ],
    postNotesStep
);
/** =====================================================================
*  POST NOTES IN PREVENTIVE
=========================================================================*/

/** =====================================================================
 *  PUT STEPS
=========================================================================*/
router.put('/:id', validarJWT, putStep);


module.exports = router;