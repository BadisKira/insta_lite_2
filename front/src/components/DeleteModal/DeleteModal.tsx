import { Box, Button, CircularProgress, Grid, Modal, Typography } from "@mui/material"
import { FC } from "react"

interface IProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    deleteWording: string
    handleDelete: () => void
    isLoading: boolean
}

const DeleteModal: FC<IProps> = ({
    isOpen,
    setIsOpen,
    deleteWording,
    handleDelete,
    isLoading
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 400,
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        p: 4,
                    }}>
                        <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={2}>{deleteWording}</Typography>
                        {isLoading ?
                            <CircularProgress />
                            :
                            <Grid container justifyContent="space-around" alignItems="center">
                                <Button onClick={handleDelete}>Supprimer</Button>
                                <Button onClick={() => setIsOpen(false)}>Annuler</Button>
                            </Grid>
                        }
                </Box>
        </Modal>
    )
}

export default DeleteModal