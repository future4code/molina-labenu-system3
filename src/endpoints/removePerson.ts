import { Request, Response } from "express"
import { deletePerson } from "../data/deletePerson"
import selectElementById from "../data/selectElementById"
import deleteRelation from "../data/deleteRelation"
import selectRelationById from "../data/selectRelationById"

const removePerson = async(req: Request, res: Response) => {

    try {

        const {personId, type} = req.body
        
        const table = type

        const result = await selectElementById(personId, table)

        if(!result.length){
            throw new Error("Usuário não encontrado")
        }
        
        if (!personId || !type) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        if(type !== "student" && type !== "teacher") {
            throw new Error("O campo type precisa ser preenchido com student ou teacher")
        }

        const typeRelation = table === "student" ? "student_hobbies" :"teacher_specialties"

        const relation = await selectRelationById(personId, typeRelation, type)

        if(relation.length){
            await deleteRelation(personId, typeRelation, type)
        }
    
        await deletePerson(personId, table)
        
        const sucessMessage = type === 'student'? 'Estudante excluído com sucesso' : 'Docente excluído com sucesso'

        res.status(201).send({message: sucessMessage})
        
    } catch (error: any) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default removePerson