import { Request, Response } from "express"
import { updateClass } from "../data/updateClass"

const updatePersonClass = async(req: Request, res: Response) => {

    try {

        const {turma, tipo} = req.body
        const id = req.params.id
        
        const table = tipo

        console.log(req.body)
        
        if (!id || !turma || !tipo) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if(tipo !== "student" && tipo !== "teacher") {
            throw new Error("O campo tipo precisa ser preenchido com student ou teacher")
        }
    
        await updateClass(id, turma, table)
        
        const sucessMessage = tipo === 'student'? 'Turma do estudante atualizada com sucesso' : 'Turma do docente atualizada com sucesso'

        res.status(201).send({message: sucessMessage})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default updatePersonClass