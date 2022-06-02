const { response } = require('express');

const Task = require('../models/tasks.model');

/** =====================================================================
 *  GET TASKS
=========================================================================*/
const getTasks = async(req, res = response) => {

    try {

        const desde = req.query.desde || 0;
        const limit = req.query.limite || 10;

        const [tasks, total] = await Promise.all([
            Task.find()
            .populate('client', 'name phone cedula email cid address city department status')
            .populate('create', 'name img')
            .skip(desde)
            .limit(limit),
            Task.countDocuments()
        ]);

        res.json({
            ok: true,
            tasks,
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
 *  GET TASK ID
=========================================================================*/
const getTaskId = async(req, res = response) => {

    try {

        const tid = req.params.id;

        // COMPROBAR SI EXISTE
        const taskDB = await Task.findById(tid)
            .populate('client', 'name phone cedula email cid address city department status')
            .populate('create', 'name img')
            .populate('products.product', 'name code');

        if (!taskDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna tarea con este ID'
            });
        }
        // COMPROBAR SI EXISTE

        res.json({
            ok: true,
            task: taskDB
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
 *  CREATE TASK
=========================================================================*/
const postTask = async(req, res = response) => {

    try {

        const uid = req.uid;

        const task = new Task(req.body);
        task.create = uid;

        await task.save();

        res.json({
            ok: true,
            task
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
 *  UPDATE TASK
=========================================================================*/
const putTask = async(req, res = response) => {

    try {

        const tid = req.params.id;

        // COMPROBAR SI EXITE
        const taskDB = await Task.findById(tid);
        if (!taskDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No encontramos esta tarea, porfavor intente de nuevo!'
            });
        }
        // COMPROBAR SI EXITE

        // UPDATE
        const {...campos } = req.body;
        const taskUpdate = await Task.findByIdAndUpdate(tid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            task: taskUpdate
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
    getTasks,
    getTaskId,
    postTask,
    putTask
};