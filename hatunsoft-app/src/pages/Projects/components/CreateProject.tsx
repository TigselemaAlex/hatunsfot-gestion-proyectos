import { Box, Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { CreateProjectForm } from ".";

export default function CreateProject({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
    const [opened, { close, open }] = useDisclosure();
    const handleClickAddProject = () => {
        open();
    }
    const handleCancel = () => {
        close()
    }
    const handleSubmitSuccess = () => {
        onSubmitSuccess()
        close()
    }
    return (
        <Box>
            <Flex justify="end">
                <Button leftIcon={<IconSquareRoundedPlusFilled />} onClick={handleClickAddProject}>Agregar</Button>
            </Flex>
            <Modal opened={opened} onClose={close} withCloseButton={false} radius="lg" padding="xs" centered>
                <CreateProjectForm onCancel={handleCancel} onSubmitSuccess={handleSubmitSuccess} />
            </Modal>
        </Box>
    )
}