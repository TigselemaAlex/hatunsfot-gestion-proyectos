import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { DataTableColumn } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components";
import { Task } from "../../../models";
import { useSessionStore } from "../../../store";
import { getTaskByProjectIdService } from "../services";
export default function TasksTable() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { user } = useSessionStore()

    const getTasks = async () => {
        const userid = user.id!;
        const res = await getTaskByProjectIdService(userid)
        if (res.error || res.data == null) return
        setTasks(res.data);
    }
    const columns = useMemo<DataTableColumn<Task>[]>(() => [
        { accessor: "name", title: "Correo" },
        { accessor: "description", title: "Nombres" },
        { accessor: "startDate", title: "Apellidos", render: (task) => <Text>{dayjs(task.startDate).format("DD/MM/YYYY")}</Text> },
        {
            accessor: "endDate", title: "Fecha de Nacimiento", render: (task) => <Text>{dayjs(task.endDate).format("DD/MM/YYYY")}</Text>
        },
        { accessor: "state", title: "Genero" },
        {
            accessor: "percentage", title: "Fecha de Registro", render: (task) => <Text>{`${task.percentage}%`}</Text>
        },
    ], []);

    useEffect(() => {
        getTasks()
    }, [])
    
    return <DataTable columns={columns} records={tasks} />
}