import { Request, Response } from "express"
import selectElementById from "../data/selectElementById"
import { updateClass } from "../data/updateClass"

const updatePersonClass = async(req: Request, res: Response) => {
    try {
        const {classId, type} = req.body
        const id = req.params.id
        
        const table = type

        const result = await selectElementById(id, table)

        if(!result.length){
            throw new Error("Estudante ou Docente não encontrado")
        }

        const findClass = await selectElementById(classId, "class")

        if(!findClass.length){
            throw new Error("Turma não encontrada")
        }
        
        if (!id || !classId || !type) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if(type !== "student" && type !== "teacher") {
            throw new Error("O campo type precisa ser preenchido com student ou teacher")
        }
    
        await updateClass(id, classId, table)
        
        const sucessMessage = type === 'student'? 'Turma do estudante atualizada com sucesso' : 'Turma do docente atualizada com sucesso'

        res.status(201).send({message: sucessMessage})
        
    } catch (error: any) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default updatePersonClass