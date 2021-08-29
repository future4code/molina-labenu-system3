import { Request, Response } from "express"
import insertPerson from '../data/insertPerson'
import selectElementById from "../data/selectElementById"

const createPerson = async (req: Request, res: Response) => {

    try {

        const { name, email, birthDate, classId, type } = req.body

        const table = type

        const verifyClass = await selectElementById(classId, "class")

        if (!verifyClass.length) {
            throw new Error("Turma não existe")
        }

        if (!name || !email || !birthDate || !type) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if (type !== "student" && type !== "teacher") {
            throw new Error("O campo type precisa ser preenchido com student ou teacher")
        }

        if (email.indexOf('@') === -1) {
            throw new Error("Digite um email válido")
        }

        const [day, month, year] = birthDate.split("/")

        const newDate: string = `${year}-${month}-${day}`

        await insertPerson(name, email, newDate, classId, table)

        const sucessMessage = type === 'student' ? 'Estudante criado com sucesso' : 'Docente criado com sucesso'

        res.status(201).send({ message: sucessMessage })

    } catch (error: any) {
        switch (error.code) {
            case "ER_DUP_ENTRY":
                res.status(404).send("E-mail já existe")
                break
            case "ER_TRUNCATED_WRONG_VALUE":
                res.status(404).send("Data de nascimento deve ser informada no formato DD/MM/AAAA")
                break
            default:
                res.status(404).send(error.message || error.sqlMessage)
        }
    }
}

export default createPerson