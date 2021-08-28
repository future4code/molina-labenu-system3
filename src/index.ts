import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import createStudent from './endpoints/createStudent'
import createTeacher from './endpoints/createTeacher'
import createClass from './endpoints/createClass'
import { getStudents } from './endpoints/getStudents'
import { getTeachers } from './endpoints/getTeachers'
import createHobbieById from './endpoints/createHobbieById'
import { getStudentsBySameHobby } from './endpoints/getStudentsBySameHobby'

export const app = express()

app.use(express.json())
app.use(cors())

app.post("/cadastro/student", createStudent)
app.post("/cadastro/teacher", createTeacher)
app.post("/createClass", createClass)

app.post("/cadastro/hobbie", createHobbieById)

app.get('/students', getStudents)
app.get('/teachers', getTeachers)

app.get("/students/sameHobby/:hobby", getStudentsBySameHobby)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.log("Failure upon starting server.")
    }
})
