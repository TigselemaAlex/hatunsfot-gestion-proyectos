import { Flex } from "@mantine/core"
import { TasksTable } from "./components"
import ProjectControl from "./components/ProjectControl"

export default function Project() {
    return (
        <Flex direction="column" h="100%" >
            <ProjectControl />
            <TasksTable />
        </Flex>
    )
}   