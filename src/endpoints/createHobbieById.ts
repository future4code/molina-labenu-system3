import { Request, Response } from "express"
import insertHobbie from '../data/insertHobbie'
import selectElementById from "../data/selectElementById"

const createHobbieById = async(req: Request, res: Response) => {

    try {

        const {studentId, nome } = req.body
       
        const result = await selectElementById(studentId, "student")

        if(!result.length){
            throw new Error("Estudante não encontrado")
        }
     
        if (!nome || !studentId ) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        await Promise.all(
            nome.map( async(hobbie: string) => {
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