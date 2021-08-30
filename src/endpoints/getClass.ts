import { Request, Response } from "express";
import { connection } from "../data/connection";

const getClass = async(Req: Request, res: Response)=> {
    try{
        const result = await connection.raw(`
            SELECT * FROM labenu_system_class;
        `);

        if(!result[0].length){
            throw new Error("Não há turma cadastrada")
        };

        res.status(200).send(result[0]);

    } catch(error: any) {
        res.status(500).send(error.message || error.sqlMessage)
    };
};

export default getClass;