import express from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = express.Router()

router.get('/listar-usuarios', async (req, res) => {
    try { //tente isso
        const users = await prisma.user.findMany({omit: {password: true, email: true}})

        res.status(200).json({message: 'Usuários listados com sucesso!', users})

    } catch(err) { // senao pegue isso
        console.log(err)
        res.status(500).json({message: 'Falha no servidor.'})
    }
})

export default router