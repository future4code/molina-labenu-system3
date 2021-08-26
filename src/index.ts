import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import dotenv from 'dotenv'
import knex from 'knex'

export const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multiStatements: true
    }
})



const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.log("Failure upon starting server.")
    }
})