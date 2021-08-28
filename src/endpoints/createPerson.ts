import { Request, Response } from "express"
import insertPerson from '../data/insertPerson'

const createPerson = async(req: Request, res: Response) => {

    try {

        const {nome, email, data_nasc, turma, tipo} = req.body
        
        const table = tipo

        console.log(req.body)
        
        if (!nome || !email || !data_nasc || !tipo) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if(tipo !== "student" && tipo !== "teacher") {
            throw new Error("O campo tipo precisa ser preenchido com student ou teacher")
        }
        
        if (email.indexOf('@') === -1) {
            throw new Error("Digite um email válido")            
        }

        const [day, month, year] = data_nasc.split("/")

        const newDate: string = `${year}-${month}-${day}`
        
        await insertPerson(nome, email, newDate, turma, table)
        
        const sucessMessage = tipo === 'student'? 'Estudante criado com sucesso' : 'Docente criado com sucesso'

        res.status(201).send({message: sucessMessage})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createPerson