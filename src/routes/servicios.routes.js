import { Router } from "express";
import pool from '../database.js'

const router= Router();

router.get('/addServicios',(req,res)=>{
    res.render('servicios/addServicios')
})

router.post('/addServicios',async(req,res)=>{
    try {
        const {nombre_servicio, descripcion_servicio }= req.body
        const nuevoServicio = {
            nombre_servicio, descripcion_servicio
        }
        await pool.query('INSERT INTO servicios SET ?', [nuevoServicio]);
        res.redirect('/listServicios');

    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

router.get('/listServicios', async (req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM servicios');
        res.render('servicios/listServicios',{servicios:result })
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

router.get('/deleteServicio/:id_servicio', async(req,res)=>{
try {
    const{id_servicio} = req.params
    await pool.query('DELETE FROM servicios WHERE id_servicio = ?', [id_servicio]);
    res.redirect('/listServicios');
} catch (error) {
    res.status(500).json({message : error.message});
}
});

router.get('/editServicios/:id_servicio', async(req,res)=>{
    try {
        const {id_servicio}= req.params
        const [servicio] = await pool.query('SELECT * FROM servicios WHERE id_servicio = ?',[id_servicio]);
        const servicioEdit = servicio[0]
      res.render('servicios/editServicios',{servicio:servicioEdit })
      

    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

router.post('/editServicios/:id_servicio', async(req,res)=>{
    try {
        const {id_servicio}= req.params 
        const {nombre_servicio, descripcion_servicio} =req.body
        const servicioEdit = {nombre_servicio, descripcion_servicio}
        await pool.query('UPDATE servicios SET ? WHERE id_servicio = ?',[servicioEdit,id_servicio]);

        res.redirect('/listServicios');
      

    } catch (error) {
        res.status(500).json({message : error.message});
    }
})



export default router;
