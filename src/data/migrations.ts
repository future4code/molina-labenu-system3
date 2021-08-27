import { connection } from "./connection"
import specialities from "./specialties.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createIndepentTables = () => connection
    .raw(`
        CREATE TABLE labenu_system_specialties (
            id INT PRIMARY KEY,
            nome VARCHAR(64) NOT NULL
        );

        CREATE TABLE labenu_system_hobbies (
            id INT PRIMARY KEY,
            nome VARCHAR(64) NOT NULL
        );

        CREATE TABLE labenu_system_class (
            id INT PRIMARY KEY,
            nome VARCHAR(64) NOT NULL,
            data_inicio DATE NOT NULL,
            data_final DATE NOT NULL,
            modulo ENUM('0', '1', '2', '3', '4', '5', '6', '7') DEFAULT '0'
        );
        
        `)
        .then(() => { console.log("Tabelas labenu_system_hobbies, labenu_system_specialties e labenu_system_class criadas") })
        .catch(printError)

const createDependentTables = () =>
        connection.raw(`

        CREATE TABLE labenu_system_student (
            id INT PRIMARY KEY,
            nome VARCHAR(64) NOT NULL,
            email VARCHAR(64) NOT NULL UNIQUE,
            data_nasc DATE NOT NULL,
            class_id INT NOT NULL,
            FOREIGN KEY (class_id) REFERENCES labenu_system_class (id)
        );
        
        CREATE TABLE labenu_system_student_hobbies (
            student_id INT NOT NULL,
            hobbies_id INT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES labenu_system_student (id),
            FOREIGN KEY (hobbies_id) REFERENCES labenu_system_hobbies (id)
        );
        
        CREATE TABLE labenu_system_teacher (
            id INT PRIMARY KEY,
            nome VARCHAR(64) NOT NULL,
            email VARCHAR(64) NOT NULL UNIQUE,
            data_nasc DATE NOT NULL,
            class_id INT NOT NULL,
            FOREIGN KEY (class_id) REFERENCES labenu_system_class (id)
        );
        
        `)
        .then(() => { console.log("Tabelas labenu_system_student,labenu_system_student_hobbies e labenu_system_teacher criadas") })
        .catch(printError)

const createTeacherSpecialtiesTable = () =>
        connection.raw(`       
        CREATE TABLE labenu_system_teacher_specialties (
            teacher_id INT NOT NULL,
            specialties_id INT NOT NULL,
            FOREIGN KEY(teacher_id) REFERENCES labenu_system_teacher(id),
            FOREIGN KEY(specialties_id) REFERENCES labenu_system_specialties(id)
        );
        
        `)
        .then(() => { console.log("Tabela labenu_system_teacher_specialties criada") })
        .catch(printError)

const insertUsers = () => connection("labenu_system_specialties")
   .insert(specialities)
   .then(() => { console.log("Especialidades Criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createIndepentTables()
    .then(createDependentTables)
    .then(createTeacherSpecialtiesTable)
    .then(insertUsers)
    .then(closeConnection)