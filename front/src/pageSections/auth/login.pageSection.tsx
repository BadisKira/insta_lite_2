import { FC, useState } from 'react'
import { 
    Button, 
    FormControl, 
    FormHelperText, 
    Grid, 
    IconButton, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    Typography 
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IError } from '../../types/error.type'


interface IProps {
    email: string
    setEmail: React.Dispatch<string>
    errorEmail: IError
    password: string
    setPassword: React.Dispatch<string>
    errorPassword: IError
    login: () => void
    changePageSection: () => void
}

const LoginPageSection: FC<IProps> = ({
    email, 
    setEmail,
    errorEmail,
    password,
    setPassword,
    errorPassword,
    login,
    changePageSection
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <Grid 
            container 
            direction="column" 
            justifyContent="center" 
            alignContent="center"
            style={{
                width: "100%",
                height: "100%",
                gap: 50,
                padding: "0px 10%"
            }}>
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{ 
                        gap: 25,
                    }}>
                        <Typography variant='h3'>InstaLite</Typography>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Typography>from</Typography>
                            <Typography variant='h5'>Ourbook</Typography>
                        </Grid>
                </Grid>

                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{ 
                        width: "100%", 
                        gap: 20,
                    }}>
                        <FormControl 
                            variant="outlined" 
                            style={{ width: "100%" }}>
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
                        <FormControl 
                            variant="outlined"
                            style={{ width: "100%" }}>
                                <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    error={errorPassword.isError}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {errorPassword.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorPassword.message}</FormHelperText>}
                        </FormControl>

                        <Button 
                            onClick={login}
                            style={{ 
                                width: "100%", 
                                padding: "12px 0px", 
                                backgroundColor: "#197fe6", 
                                color: "white" 
                            }}>
                                SE CONNECTER
                        </Button>
                        

                        <Grid container justifyContent="center" alignItems="center" style={{ gap: 10 }}>
                            <Typography>Vous n'avez pas un compte ?</Typography>
                            <Typography 
                                style={{
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    color: "#197fe6",
                                }}
                                onClick={changePageSection}>
                                    Créer un compte
                            </Typography>
                        </Grid>
                </Grid>
        </Grid>
    )
}

export default LoginPageSection