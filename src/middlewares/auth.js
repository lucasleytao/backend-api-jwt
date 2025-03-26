//interceptadores entre requisicoes e respostas

import express from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {

    // console.log(req)

    const token = req.headers.authorization //faz a magica e verifica se token e valido ou nao

    console.log(token) //imprime token se for valido

    if (!token) { //se token invalido
        return res.status(401).json({message: 'Acesso negado.'})
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) //decodifica e verifica se o token e valido

        // console.log(decoded)

        req.userId = decoded.id //crio um novo objeto e coloco dentro da requisicao

    } catch(err) {
        return res.status(401).json({message: 'Token inválido.'})
    }

    next() //quando o token e validado o next e chamado
}

export default auth