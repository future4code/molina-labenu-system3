import { Request, Response } from "express";
import selectElementById from "../data/selectElementById";
import insertToTeacherSpecialties from "../data/insertToTeacherSpecialties";

const connectTeacherWithSpecialty = async (req: Request, res: Response) => {
    try{
        const {teacherId, specialtiesId} = req.body

        if(!teacherId || !specialtiesId){
            throw new Error("Os campos 'teacherId' e 'specialtiesId' são obrigatorios")
        }

        console.log("1")

        const findTeacher = await selectElementById(teacherId, "teacher")
        if(!findTeacher.length){
            throw new Error("Não existe docente com Id enviado")
        }

        console.log("2")

        await Promise.all(
            specialtiesId.map(async(specialties: string) => {
                const findSpecialty = await selectElementById(specialties, "specialties")
                if(!findSpecialty.length){
                    throw new Error(`Especialidade id = ${specialties} encontrado`)
                }
            })
        )

        console.log("3")

        await Promise.all(
            specialtiesId.map(async(specialty: string) =>{
                await insertToTeacherSpecialties(teacherId,specialty)
            })
        )

        console.log("4")

        res.status(200).send("Especialidades adicionadas")

    }catch(error){
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default connectTeacherWithSpecialty