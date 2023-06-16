import { Flex, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateProject, ProjectCard } from ".";
import { ProjectCardsResponse } from "../../../models";
import { useSessionStore } from "../../../store";
import { getProjectsService } from "../services/getProjects.service";
export default function ProjectCardsContainer() {
    const { user } = useSessionStore();
    const [cards, setCards] = useState<ProjectCardsResponse[]>([]);
    const getCards = async () => {
        const res = await getProjectsService(user.id!);
        if (res.error || res.data == null) return
        setCards(res.data);
    }
    useEffect(() => {
        getCards()
    }, []);
    return (
        <Flex direction="column" gap="md">
            <CreateProject onSubmitSuccess={getCards} />
            <SimpleGrid cols={4}>
                {cards.map(card => (
                    <ProjectCard key={card.id} title={card.name} description={card.description} numTasks={card.task_quantity} idProject={card.id} />
                ))}
            </SimpleGrid  >
        </Flex>
    )
}