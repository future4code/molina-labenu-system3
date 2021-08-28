import { Request, Response } from "express"
import { deletePerson } from "../data/deletePerson"

const removePerson = async(req: Request, res: Response) => {

    try {

        const {id, tipo} = req.body
        
        const table = tipo

        console.log(id)
        
        if (!id || !tipo) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if(tipo !== "student" && tipo !== "teacher") {
            throw new Error("O campo tipo precisa ser preenchido com student ou teacher")
        }
    
        await deletePerson(id, table)
        
        const sucessMessage = tipo === 'student'? 'Estudante excluído com sucesso' : 'Docente excluído com sucesso'

        res.status(201).send({message: sucessMessage})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default removePerson