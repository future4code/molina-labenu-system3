import { Request, Response } from "express";
import selectPersonClass from "../data/selectPersonClass";
import selectElementById from "../data/selectElementById";
import moment from 'moment' ;

const getPersonClass = async (req: Request, res: Response) => {
    try {
        const {classId, type} = req.body;
        
        const table = type;

        const verifyClass = await selectElementById(classId, "class");

        if (!verifyClass.length) {
            throw new Error("Turma não existe")
        };

        if (!classId || !type ) {
            throw new Error("Preencha todos os campos obrigatórios")
        };
        
        if(type !== "student" && type !== "teacher") {
            throw new Error("O campo type precisa ser preenchido com student ou teacher")
        };
        
        const result = await selectPersonClass(classId, table);
        
        if(!result){
            throw new Error("Não foi encontrado nenhum dado");
        };

        const students = result.map((student: any) => {
            return {
                id: student.id,
                nome: student.nome,
                email: student.email,
                data_nasc: moment(student.data_nasc, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                turma_id: student.class_id
            };
        });

        res.status(200).send(students);
    } catch (error: any) {
        res.status(500).send(error.message || error.sqlMessage);
    };
};

export default getPersonClass;