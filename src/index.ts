import app from './app'
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

app.post("/register", createPerson)
app.post("/createClass", createClass)

app.post("/cadastro/hobbie", createHobbieById)

app.get('/students', getStudents)
app.get('/teachers', getTeachers)
app.get('/student/:id', getAgeStudentsById)
app.get('/personClass', getPersonClass)

app.put("/class", putModuleClass)
app.put('/class/:id', updatePersonClass)

app.delete('/deletePerson',removePerson)

app.get("/students/sameHobby/:hobby", getStudentsBySameHobby)

