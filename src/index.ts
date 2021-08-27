import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import createStudent from './endpoints/createStudent'
import createClass from './endpoints/createClass'
import { getStudents } from './endpoints/getStudent'

export const app = express()

app.use(express.json())
app.use(cors())

app.post("/cadastro/student", createStudent)
app.get('/students', getStudents)
app.post("/createClass", createClass)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.log("Failure upon starting server.")
    }
})
