import { Request, Response } from "express";
import insertHobbie from '../data/insertHobbie';
import selectElementById from "../data/selectElementById";

const createHobbieById = async(req: Request, res: Response) => {
    try {
        const {studentId, name } = req.body;
       
        const result = await selectElementById(studentId, "student");

        if(!result.length){
            throw new Error("Estudante não encontrado");
        };

        if(typeof name !== "object"){
            throw new Error("Os Hobbies devem ser enviados em um array de strings");
        };
     
        if (!name || !studentId ) {
            throw new Error("Preencha todos os campos obrigatórios");
        };

        await Promise.all(
            name.map( async(hobbie: string) => {
                const idHobbie = Date.now() + Math.random().toString()
                await insertHobbie(studentId, hobbie, idHobbie);  
            })
        );
        
        res.status(201).send({message:'Hobbies cadastrados com sucesso!'});
        
    } catch (error: any) {
        res.status(500).send(error.message || error.sqlMessage)
    };
};

export default createHobbieById;