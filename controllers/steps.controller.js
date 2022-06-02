const { response } = require('express');

const Step = require('../models/steps.model');

/** =====================================================================
 *  GET STEPS
=========================================================================*/
const getStepsTask = async(req, res = response) => {

    try {

        const task = req.params.task;

        const steps = await Step.find({ task })
            .populate('staff', 'name img uid')
            .populate('attachments.user', 'name img')
            .populate('notes.staff', 'name img');

        res.json({
            ok: true,
            steps
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });
    }

};

/** =====================================================================
 *  CREATE STEP
=========================================================================*/
const postStep = async(req, res = response) => {

    try {

        const step = new Step(req.body);

        await step.save();

        res.json({
            ok: true,
            step
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });
    }

};

/** =====================================================================
 *  CREATE NOTES IN STEP
=========================================================================*/
const postNotesStep = async(req, res = response) => {

    try {

        const stid = req.params.id;
        const uid = req.uid;

        // SEARCH STEP
        const stepDB = await Step.findById(stid);
        if (!stepDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun step con este ID'
            });
        }
        // SEARCH STEP

        const nota = req.body;

        // AGREGAMOS AL USUARIO
        nota.staff = uid;

        // AGREGAMOS EL NUEVO COMENTARIO
        stepDB.notes.push(nota);

        // UPDATE
        const stepUpdate = await Step.findByIdAndUpdate(stid, { notes: stepDB.notes }, { new: true })
            .populate('staff', 'name img uid')
            .populate('attachments.user', 'name img')
            .populate('notes.staff', 'name img');

        res.json({
            ok: true,
            step: stepUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

}

/** =====================================================================
 *  CREATE NOTES IN STEP
=========================================================================*/

/** =====================================================================
 *  UPDATE STEP
=========================================================================*/
const putStep = async(req, res = response) => {

    try {

        const stid = req.params.id;

        // COMPROBAR SI EXITE
        const stepDB = await Step.findById(stid);
        if (!stepDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No encontramos esta tarea, porfavor intente de nuevo!'
            });
        }
        // COMPROBAR SI EXITE

        // UPDATE
        const {...campos } = req.body;
        const stepUpdate = await Step.findByIdAndUpdate(stid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            step: stepUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente de nuevo'
        });
    }

};

// EXPORTS
module.exports = {
    getStepsTask,
    postStep,
    putStep,
    postNotesStep
};