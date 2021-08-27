import { Request, Response } from "express"
import insertStudent from '../data/insertStudent'

const createStudent = async(req: Request, res: Response) => {

    try {

        const {nome, email, data_nasc} = req.body
        const table = req.params.table
        console.log(req.body)
        
        if (!nome || !email || !data_nasc) {
            throw new Error("Preencha todos os campos obrigatórios")
        }
        
        if (email.indexOf('@') === -1) {
            throw new Error("Digite um email válido")            
        }

        const [day, month, year] = data_nasc.split("/")

        const newDate: string = `${year}-${month}-${day}`
        
        await insertStudent(nome, email, newDate, table)
        
        res.status(200).send({message:'Estudante criado com sucesso'})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createStudent