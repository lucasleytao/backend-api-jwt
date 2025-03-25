//interceptadores entre requisicoes e respostas

import express from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    console.log(req)
}

export default auth