import { Router } from "express";
import pool from '../database.js'

const router= Router();

router.get('/sobrenosotros',(req,res)=>{
    res.render('static/sobrenosotros')
})

export default router;