const express = require('express');
const router = express.Router();

 const Task = require('../models/task')

 router.get('/', async (req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
 });
 
 router.get('/:id', async (req,res)=>{
     const task = await Task.findById(req.params.id);
     res.json(task);
 });
 
 router.post('/', async (req,res)=>{
     const {no_control,no_orden,fecha,no_proce,fecha_limite,no_solicitud,
            partido_pre,uni_me,canti_soli,precio,importe,descrip}= req.body;
     const tasks = new Task({no_control,no_orden,fecha,no_proce,fecha_limite,no_solicitud,
        partido_pre,uni_me,canti_soli,precio,importe,descrip});
     await tasks.save();
     res.json({status:'Orden Guardada'});
 });
 
 router.put('/:id', async (req, res)=>{
     const {no_control,no_orden,fecha,no_proce,fecha_limite,no_solicitud,
        partido_pre,uni_me,canti_soli,precio,importe,descrip} = req.body;
     const newTask ={no_control,no_orden,fecha,no_proce,fecha_limite,no_solicitud,
        partido_pre,uni_me,canti_soli,precio,importe,descrip};
     await Task.findByIdAndUpdate(req.params.id, newTask);
     res.json({status:'Orden Actualizada'});
 });
 
 router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status:'Orden Eliminada'})
 });

module.exports = router;