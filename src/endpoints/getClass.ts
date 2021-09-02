import { Request, Response } from "express";
import moment from "moment";
import { connection } from "../data/connection";

const getClass = async(Req: Request, res: Response)=> {
    try{
        const result = await connection.raw(`
            SELECT * FROM labenu_system_class;
        `);

        if(!result[0].length){
            throw new Error("Não há turma cadastrada")
        };

        const resultsFormated = result[0].map((r:any )=> {
            return{
                ...r,
                data_inicio: moment(r.data_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                data_final: moment(r.data_final, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            }
        })
        res.status(200).send(
            resultsFormated
        );

    } catch(error: any) {
        res.status(500).send(error.message || error.sqlMessage)
    };
};

export default getClass;

