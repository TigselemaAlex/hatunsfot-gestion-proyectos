import { Button, Flex, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import * as Yup from "yup";
import { Project } from "../../../models";
import { useSessionStore } from "../../../store";
import { saveProjectService } from "../services";


const initialValues: Project = {
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
}

const validationSchema = Yup.object<Project>().shape({
    name: Yup.string().required("El mensaje es obligatorio"),
    description: Yup.string().required("La fecha es obligatorio"),
    startDate: Yup.date().required("La rutina es obligatoria"),
    endDate: Yup.date().required("La hora es obligatoria"),
});
export default function CreateProjectForm({ onSubmitSuccess, onCancel }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
    }) {
    const { user } = useSessionStore();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: initialValues,
        validate: yupResolver(validationSchema)
    })

    const handleSubmit = async (project: Project) => {
        setLoading(true)
        const res = await saveProjectService(project, user.id!)
        if (res.error || res.data == null) return;
        setLoading(false)
        onSubmitSuccess()
    }

    return (
        <Flex direction="column" p="lg">
            <Text align="center" mb="lg" >Crear Proyecto</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        label="Nombre"
                        {...form.getInputProps("name")}

                    />
                    <TextInput
                        label="Descripción"
                        {...form.getInputProps("description")}

                    />
                    <DatePickerInput
                        label="Fecha de inicio"
                        {...form.getInputProps("startDate")}
                    />
                    <DatePickerInput
                        label="Fecha de finalización"
                        {...form.getInputProps("endDate")}
                    />

                </Flex>
                <Flex justify="space-between" mt="lg">
                    <Button variant="white" onClick={onCancel}>Cancelar</Button>
                    <Button loading={loading} type="submit">Aceptar</Button>
                </Flex>
            </form>
        </Flex>
    )
}