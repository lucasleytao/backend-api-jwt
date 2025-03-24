import express from 'express'
import publicRoutes from './routes/public.js'

const app = express() //guarda o express dentro de uma variavel app e utiliza todos os seus recursos

app.use(express.json()) //avisa para o express utilize json

app.use('/', publicRoutes)

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})

/*tasks
criar 3 rotas JWT
públicas
.cadastrar
.login
privadas
.listar usuários
*/

/*MongoDB
lucasleytao
3dtQE2dSVR94QOVH
driver: mongodb+srv://lucasleytao:<db_password>@users.iu7xx.mongodb.net/?retryWrites=true&w=majority&appName=Users
*/