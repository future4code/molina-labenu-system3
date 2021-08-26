import { Request, Response } from "express-serve-static-core"
import insertStudent from '../data/insertStudent'

const createStudent = async(req: Request, res: Response) => {

    try {

        const {nome, email, data_nasc} = req.body
        const [dia, mes, ano] = data_nasc.split("/")

        const newDate: string = `${ano}-${mes}-${dia}`

        if (!nome || !email || !data_nasc) {
            throw new Error("Preencha todos os campos obrigatórios");
            
        }

        if (email.indexOf('@') === -1) {
            throw new Error("Digite um email válido");
            
        }


        await insertStudent(nome, email, newDate)
        
        res.status(200).send({message:'Estudante criado com sucesso'})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createStudent