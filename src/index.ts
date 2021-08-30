import app from "./app";
import createPerson from "./endpoints/createPerson";
import createClass from "./endpoints/createClass";
import createHobbieById from "./endpoints/createHobbieById";
import connectTeacherWithSpecialty from "./endpoints/connectTeacherWithSpecialty"
import getClass from "./endpoints/getClass";
import getStudents from "./endpoints/getStudents";
import getTeachers from "./endpoints/getTeachers";
import getAgeStudentsById from "./endpoints/getAgeStudentsById";
import getPersonClass from "./endpoints/getPersonClass";
import getStudentsBySameHobby from "./endpoints/getStudentsBySameHobby"
import putModuleClass from "./endpoints/putModuleClass";
import updatePersonClass from "./endpoints/updatePersonClass";
import removePerson from "./endpoints/removePerson";

app.post("/register", createPerson);
app.post("/createClass", createClass);
app.post("/resgister/hobbie", createHobbieById);
app.post("/relationteacherspecialty",connectTeacherWithSpecialty);

app.get("/allclasses", getClass);
app.get('/students', getStudents);
app.get('/teachers', getTeachers);
app.get('/student/:id', getAgeStudentsById);
app.get('/personClass', getPersonClass);
app.get("/students/sameHobby/:hobby", getStudentsBySameHobby);

app.put("/class", putModuleClass);
app.put('/class/:id', updatePersonClass);

app.delete('/deletePerson',removePerson);


