import { Request, Response } from "express"
import insertHobbie from '../data/insertHobbie'

const createHobbieById = async(req: Request, res: Response) => {

    try {

        const {id, nome } = req.body
       
        console.log(req.body)
        console.log("nome antes", nome[0])
        
        if (!nome || !id ) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        await Promise.all(
            nome.map( async(hobbie: string) => {
                const idHobbie = Date.now() + Math.random().toString()
                await insertHobbie(id, hobbie, idHobbie)  
            })
        )
        
        res.status(200).send({message:'Hobbies cadastrados com sucesso!'})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createHobbieById