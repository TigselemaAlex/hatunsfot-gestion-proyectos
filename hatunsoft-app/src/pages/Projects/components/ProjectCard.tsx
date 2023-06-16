import { Box, Button, Card, Text, createStyles } from "@mantine/core";
import { Link } from "react-router-dom";
const useStyles = createStyles(() => ({
    box: {
        position: "relative",
    },

}))
export default function ProjectCard({ title, description, numTasks, idProject }: { title: string, description: string, numTasks: number, idProject: number }) {
    const { classes } = useStyles()
    return (
        <Box className={classes.box}>
            <Card p="xl" >
                <Card.Section py="sm">
                    <Text align="center" fw="bold"> {title}</Text>
                </Card.Section>
                <Card.Section p="sm">
                    <Text align="justify"> {description}</Text>
                </Card.Section>
                <Card.Section p="sm">
                    <Text align="center"> Número de tareas: {numTasks}</Text>
                </Card.Section>
            </Card>
            <Link to={`/app/project/${idProject}`}>
                <Button fullWidth >Abrir</Button >
            </Link>
        </Box>
    )
}