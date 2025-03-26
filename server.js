import express from 'express'
import publicRoutes from './src/routes/public.js'
import privateRoutes from './src/routes/private.js'
import auth from './src/middlewares/auth.js'

const app = express() //guarda o express dentro de uma variavel app e utiliza todos os seus recursos

app.use(express.json()) //avisa para que o express utilize json

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes) //o express determina que antes de acessar as rotas privadas deve-se passar pelo auth

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