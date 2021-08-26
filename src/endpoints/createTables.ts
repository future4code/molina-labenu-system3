import { Request, Response } from "express"
import { connection } from "../data/connection"

export const criaTabelas = async (req: Request, res: Response): Promise<void> => {
    try {
        await connection.raw(`

            CREATE TABLE labenu_system_student (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                data_nasc DATE NOT NULL,
                class_id INT NOT NULL,
                FOREIGN KEY(class_id) REFERENCES labenu_system_class(id)
            );

            CREATE TABLE labenu_system_hobbies (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(64) NOT NULL
            );

            CREATE TABLE labenu_system_student_hobbies (
                student_id INT NOT NULL,
                hobbies_id INT NOT NULL,
                FOREIGN KEY(student_id) REFERENCES labenu_system_student(id),
                FOREIGN KEY(hobbies_id) REFERENCES labenu_system_hobbies(id)
            );

            CREATE TABLE labenu_system_teacher (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                data_nasc DATE NOT NULL,
                class_id INT NOT NULL,
                FOREIGN KEY(class_id) REFERENCES labenu_system_class(id)
            );

            CREATE TABLE labenu_system_specialties (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(64) NOT NULL
            );

            CREATE TABLE labenu_system_teacher_specialties (
                teacher_id INT NOT NULL,
                specialties_id INT NOT NULL,
                FOREIGN KEY(teacher_id) REFERENCES labenu_system_teacher(id),
                FOREIGN KEY(specialties_id) REFERENCES labenu_system_specialties(id)
            );

            CREATE TABLE labenu_system_class (
                id INT PRIMARY KEY NOT NULL,
                name VARCHAR(64) NOT NULL,
                data_inicio DATE NOT NULL,
                data_final DATE NOT NULL,
                modulo INT NOT NULL
            );

            `)

            res.status(200).send({message:"tabelas criadas"})
            } catch (error) {
                console.log(error)
                res.send(error.message || error.sqlMessage)
            }
}