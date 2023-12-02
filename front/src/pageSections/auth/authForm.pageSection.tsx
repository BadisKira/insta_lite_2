import { Grid } from '@mui/material'
import LoginPageSection from './login.pageSection'
import SignUpPageSection from './signup.pageSection'
import React, { FC } from 'react'
import { IError } from '../../types/error.type'


interface IProps {
    firstname: string
    setFirstname: React.Dispatch<string>
    lastname: string
    setLastname: React.Dispatch<string>
    email: string
    setEmail: React.Dispatch<string>
    password: string
    setPassword: React.Dispatch<string>
    confirmPassword: string
    setConfirmPassword: React.Dispatch<string>
    registerEmail: string
    setRegisterEmail: React.Dispatch<string>
    registerPassword: string
    setRegisterPassword: React.Dispatch<string>
    errorFirstname: IError
    errorLastname: IError
    errorEmail: IError
    errorPassword: IError
    errorConfirmPassword: IError 
    errorRegisterEmail: IError
    errorRegisterPassword: IError
    isOnLoginSection: boolean
    changePageSection: () => void
    handleLogin: () => void
    handleRegister: () => void
}

const AuthFormPageSection: FC<IProps> = ({
    firstname, setFirstname,
    lastname, setLastname,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    registerEmail, setRegisterEmail,
    registerPassword, setRegisterPassword,
    errorFirstname,
    errorLastname,
    errorEmail,
    errorPassword, 
    errorConfirmPassword, 
    errorRegisterEmail, 
    errorRegisterPassword, 
    isOnLoginSection,
    changePageSection,
    handleLogin,
    handleRegister,
}) => {
    
    return (
        <Grid
            style={{
                padding: 60, 
                borderRadius: 12,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#FFFFFF",
            }}>
            {isOnLoginSection ?
                <LoginPageSection
                    email={email}
                    setEmail={setEmail}
                    errorEmail={errorEmail}
                    password={password}
                    setPassword={setPassword}
                    errorPassword={errorPassword}
                    login={handleLogin}
                    changePageSection={changePageSection}
                />
                :
                <SignUpPageSection 
                    firstname={firstname} setFirstname={setFirstname} errorFirstname={errorFirstname}
                    lastname={lastname} setLastname={setLastname} errorLastname={errorLastname}
                    email={registerEmail} setEmail={setRegisterEmail} errorEmail={errorRegisterEmail}
                    password={registerPassword} setPassword={setRegisterPassword} errorPassword={errorRegisterPassword}
                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} errorConfirmPassword={errorConfirmPassword}
                    register={handleRegister}
                    changePageSection={changePageSection} 
                />
            }
        </Grid>
    )
}

export default AuthFormPageSection