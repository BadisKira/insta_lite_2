import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { IError } from '../../types/error.type'

interface Iprops {
    firstname: string
    setFirstname: React.Dispatch<string>
    errorFirstname: IError
    lastname: string
    setLastname: React.Dispatch<string>
    errorLastname: IError
    email: string
    setEmail: React.Dispatch<string>
    errorEmail: IError
    password: string
    setPassword: React.Dispatch<string>
    errorPassword: IError
    confirmPassword: string
    setConfirmPassword: React.Dispatch<string>
    errorConfirmPassword: IError
    register: () => void
    changePageSection: () => void
}

const SignInPageSection: FC<Iprops> = ({
    firstname,
    setFirstname,
    errorFirstname,
    lastname,
    setLastname,
    errorLastname,
    email,
    setEmail,
    errorEmail,
    password,
    setPassword,
    errorPassword,
    confirmPassword,
    setConfirmPassword,
    errorConfirmPassword,
    register,
    changePageSection,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                padding: "0px 10%" ,
            }}>
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{ 
                        gap: 25,
                    }}>
                        <Typography variant='h3'>Créez un compte sur InstaLite</Typography>
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
                        <Grid container style={{ gap: 20 }}>
                            <FormControl 
                                variant="outlined" 
                                style={{ flex: 1 }}>
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
                                style={{ flex: 1 }}>
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
                        </Grid>
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
                                    error={errorPassword.isError}
                                />
                                {errorPassword.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorPassword.message}</FormHelperText>}
                        </FormControl>

                        
                        <FormControl 
                            variant="outlined"
                            style={{ width: "100%" }}>
                                <InputLabel htmlFor="outlined-adornment-confirmpassword">Confirmez le mot de passe</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirmpassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                            edge="end"
                                            >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirmr"
                                    error={errorConfirmPassword.isError}
                                />
                                {errorConfirmPassword.isError && <FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorConfirmPassword.message}</FormHelperText>}
                        </FormControl>

                        <Button 
                            onClick={register}
                            style={{ 
                                width: "100%", 
                                padding: "12px 0px", 
                                backgroundColor: "#197fe6", 
                                color: "white" 
                            }}>
                                S'ENREGISTRER
                        </Button>
                        

                        <Grid container justifyContent="center" alignItems="center" style={{ gap: 10 }}>
                            <Typography>Vous avez un compte ?</Typography>
                            <Typography 
                                style={{
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    color: "#197fe6",
                                }}
                                onClick={changePageSection}>
                                    Se connecter
                            </Typography>
                        </Grid>
                </Grid>
        </Grid>
    )
}

export default SignInPageSection