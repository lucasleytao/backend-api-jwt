// rotas publicas

import express from 'express' 
import bcrypt from 'bcrypt' //posso dar o nome que eu quiser e importo do pacote bcrypt
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client' //importa a classe prismaclient do pacote prisma/client  

const prisma = new PrismaClient() //cria uma nova instancia (objeto prisma) do prismaclient para operacoes no banco

const router = express.Router() //utiliza apenas o router do express para o codigo

//preciso desse secret para criar o token e tambem para verificar se o token e valido ou nao
const JWT_SECRET = process.env.JWT_SECRET //caminho para acessar algo no arquivo .env

//rota de cadastro

router.post('/cadastro', async (req, res) => { //router do express
    
    try { //tente isso primeiro

        const user = req.body

        const salt = await bcrypt.genSalt(10) //nivel de encriptacao por padrao e 10
        const hashPassword = await bcrypt.hash(user.password, salt) //o que eu quero encriptar e qual o nivel de encriptacao
    
        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })
    
        res.status(201).json(userDB)
    }

    catch(err) { //pegue isso e mostre caso a tentativa falhe
        res.status(500).json({message: 'Erro de servidor. Tente novamente.'})
    }
})

//rota de login

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body //pega as informacoes de login do usuario

        //bate na porta do banco (prisma acessa mongodb) e verifica se o usuario existe
        const user = await prisma.user.findUnique({ 
            where: { //onde
                email: userInfo.email
            }
        })

        if(!user) {
            return res.status(404).json({message: 'Usuário não encontrado! Verifique suas credenciais.'})
        }
        //compara senha cadastrada no banco com a digitada
        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Senha inválida! Verifique e tente novamente'})
        }

        //gerar token JWT

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1m'}) //payload: jwt_secret: options

        res.status(200).json(token) //exibe o token: header[algoritmo e tipo de token] payload[dados] signature[verificacao]
    }
    catch(err) {
        res.status(500).json({message: 'Erro de autenticação. Tente novamente.'})
    }
})

export default router