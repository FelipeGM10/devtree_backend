import express from 'express' // ESM ECMAScript Modules
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

connectDB()

const app = express()

// Cors
app.use(cors(corsConfig))

// Leer datos de formularios
app.use(express.json())

// Ejecuta la función router para todas las peticiones que se reciban en '/'
app.use('/', router)

export default app