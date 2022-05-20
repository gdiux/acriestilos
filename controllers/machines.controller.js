const { response } = require('express');

const Machine = require('../models/machines.model');

/** =====================================================================
 *  GET MACHINES
=========================================================================*/
const getMachines = async(req, res = response) => {

    try {

        const desde = req.query.desde || 0;
        const limit = req.query.limite || 10;

        const [machines, total] = await Promise.all([
            Machine.find()
            .skip(desde)
            .limit(limit),
            Machine.countDocuments()
        ]);

        res.json({
            ok: true,
            machines,
            total
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
 *  CREATE MACHINE
=========================================================================*/
const postMachine = async(req, res = response) => {

    try {

        const machine = new Machine(req.body);

        await machine.save();

        res.json({
            ok: true,
            machine
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
 *  UPDATE MACHINE
=========================================================================*/
const putMachine = async(req, res = response) => {

    try {

        const maid = req.params.id;

        // COMPROBAR SI EXITE
        const machineDB = await Machine.findById(maid);
        if (!machineDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No encontramos esta maquina, porfavor intente de nuevo!'
            });
        }
        // COMPROBAR SI EXITE

        // UPDATE
        const {...campos } = req.body;
        const machineUpdate = await Machine.findByIdAndUpdate(maid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            machine: machineUpdate
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
    getMachines,
    postMachine,
    putMachine
};