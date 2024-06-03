import { Router } from "express";
import pool from '../database.js'

const router= Router();

router.get('/addsup',(req,res)=>{
    res.render('suscripcion/addsup')
})

router.post('/addsub',async (req,res)=>{
    try {
        const {nombre_sup, descripcion_sup, precio }= req.body
        const nuevasup = {
            nombre_sup, descripcion_sup, precio
        }
        await pool.query('INSERT INTO suscripcion SET ?', [nuevasup]);
        res.redirect('/listsup');

    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

router.get('/listsup', async (req, res) =>{
    try {
        const [result] = await pool.query('SELECT * FROM suscripcion');
        res.render('suscripcion/listsup',{suscripcion:result })
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

router.get('/deleteSup/:id_sup', async(req,res)=>{
try {
    const{id_sup} = req.params
    await pool.query('DELETE FROM suscripcion WHERE id_sup = ?', [id_sup]);
    res.redirect('/listsup');
} catch (error) {
    res.status(500).json({message : error.message});
}
});

router.get('/editsup/:id_sup', async(req,res)=>{
    try {
        const {id_sup}= req.params
        const [sup] = await pool.query('SELECT * FROM suscripcion WHERE id_sup = ?',[id_sup]);
        const supEdit = sup[0]
      res.render('servicios/editServicios',{sup:supEdit })
      

    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

router.post('/editsup/:id_sup', async(req,res)=>{
    try {
        const {id_sup}= req.params 
        const {nombre_sup, descripcion_sup, precio} =req.body
        const supEdit = {nombre_sup, descripcion_sup, precio}
        await pool.query('UPDATE suscripcion SET ? WHERE id_sup = ?',[supEdit,id_sup]);

        res.redirect('/listsup');
      

    } catch (error) {
        res.status(500).json({message : error.message});
    }
})



export default router;
