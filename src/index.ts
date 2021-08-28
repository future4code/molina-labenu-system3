import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import createClass from './endpoints/createClass'
import createPerson from './endpoints/createPerson'
import { getStudents } from './endpoints/getStudents'
import { getTeachers } from './endpoints/getTeachers'
import createHobbieById from './endpoints/createHobbieById'
import { getStudentsBySameHobby } from './endpoints/getStudentsBySameHobby'
import getAgeStudentsById from './endpoints/getAgeStudentsById'
import { getPersonClass } from './endpoints/getPersonClass'
import updatePersonClass from './endpoints/updatePersonClass'
import removePerson from './endpoints/removePerson'
import putModuleClass from './endpoints/putModuleClass'

export const app = express()

app.use(express.json())
app.use(cors())

app.post("/cadastro", createPerson)
app.post("/createClass", createClass)

app.post("/cadastro/hobbie", createHobbieById)

app.get('/students', getStudents)
app.get('/teachers', getTeachers)
app.get('/student/:id', getAgeStudentsById)
app.get('/personClass', getPersonClass)

app.put("/turma", putModuleClass)
app.put('/turma:id', updatePersonClass)

app.delete('/deletar',removePerson)

app.get("/students/sameHobby/:hobby", getStudentsBySameHobby)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.log("Failure upon starting server.")
    }
})
