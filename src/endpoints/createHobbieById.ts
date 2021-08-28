import { Request, Response } from "express"
import insertHobbie from '../data/insertHobbie'
import selectElementById from "../data/selectElementById"

const createHobbieById = async(req: Request, res: Response) => {

    try {

        const {studentId, name } = req.body
       
        const result = await selectElementById(studentId, "student")

        if(!result.length){
            throw new Error("Estudante não encontrado")
        }
     
        if (!name || !studentId ) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        await Promise.all(
            name.map( async(hobbie: string) => {
                const idHobbie = Date.now() + Math.random().toString()
                await insertHobbie(studentId, hobbie, idHobbie)  
            })
        )
        
        res.status(200).send({message:'Hobbies cadastrados com sucesso!'})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createHobbieById