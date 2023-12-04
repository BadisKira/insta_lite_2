import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, Modal, OutlinedInput } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { IUser } from "../../types/user.type"
import useUserErrorStates from "../../hooks/userUserErrorStates.hook"
import { IDisplayedError } from "../../types/validation.type"
import { emailSchema, userNameSchema } from "../../validations/account.validation"
import toast from "react-hot-toast"
import validation from "../../utils/validation.util"

interface IProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: IUser
    handleUpdate: (firstname: string, lastname: string, email: string,) => void
    isLoading: boolean
}

const EditUserModal: FC<IProps> = ({
    isOpen,
    setIsOpen,
    user,
    handleUpdate,
    isLoading
}) => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        setFirstname(user && user.firstname)
        setLastname(user && user.lastname)
        setEmail(user && user.email)
    }, [user, user.email, user.firstname, user.lastname])
    
    const { 
        errorFirstname, setErrorFirstname, 
        errorLastname, setErrorLastname, 
        errorEmail, setErrorEmail 
    } = useUserErrorStates()

    const handleValidateUserInfos = async () => {
        if (firstname === user!.firstname && lastname === user!.lastname && email === user!.email) {
            setErrorFirstname({ isError: false, message: "" })
            setErrorLastname({ isError: false, message: "" })
            setErrorEmail({ isError: false, message: "" })
            return false
        }

        const displayedErrors = [
            { path: "firstname", setError: setErrorFirstname },
            { path: "lastname", setError: setErrorLastname },
            { path: "email", setError: setErrorEmail },
        ] as IDisplayedError[]

        if (await validation({ firstname, lastname, email }, userNameSchema.concat(emailSchema), displayedErrors)) {
            setErrorFirstname({ isError: false, message: "" })
            setErrorLastname({ isError: false, message: "" })
            setErrorEmail({ isError: false, message: "" })
            return true
        }
        
        toast.error("Un ou plusieurs champs ne sont pas valide !")
        return false 
    }

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
                        width: "fit-content",
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        p: 4,
                    }}>
                        <FormControl 
                            variant="outlined" 
                            style={{ width: "100%", marginBottom: 12 }}>
                            <InputLabel htmlFor="outlined-adornment-firsname">Nom</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-firstname"
                                type="firstname"
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                label="Nom"
                                error={errorFirstname.isError}
                            />
                            {errorFirstname.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorFirstname.message}</FormHelperText>}
                        </FormControl>
                        <FormControl 
                            variant="outlined" 
                            style={{ width: "100%", marginBottom: 12 }}>
                            <InputLabel htmlFor="outlined-adornment-lastname">Prénom</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-lastname"
                                type="lastname"
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                label="Prénom"
                                error={errorLastname.isError}
                            />
                            {errorLastname.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorLastname.message}</FormHelperText>}
                        </FormControl>
                        <FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                label="Email"
                                error={errorEmail.isError}
                            />
                            {errorEmail.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorEmail.message}</FormHelperText>}
                        </FormControl>
                        {isLoading ?
                            <CircularProgress />
                            :
                            <Grid container justifyContent="space-around" alignItems="center">
                                <Button onClick={async () => await handleValidateUserInfos() && handleUpdate(firstname, lastname, email)}>Modifier</Button>
                                <Button onClick={() => setIsOpen(false)}>Annuler</Button>
                            </Grid>
                        }
                </Box>
        </Modal>
    )
}

export default EditUserModal