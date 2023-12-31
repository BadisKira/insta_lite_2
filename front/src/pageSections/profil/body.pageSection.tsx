import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { IError } from '../../types/error.type'
import { useAuthContext } from '../../hooks/useAuthContext.hook'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import UserPortfolioSectionPage from '../portfolio/userPortfolio.pageSection'

interface IProps {
    firstname: string
    setFirstname: React.Dispatch<string>
    errorFirstname: IError
    lastname: string
    setLastname: React.Dispatch<string>
    errorLastname: IError
    email: string
    setEmail: React.Dispatch<string>
    errorEmail: IError
    oldPassword: string
    setOldPassword: React.Dispatch<string>
    errorOldPassword: IError
    password: string
    setPassword: React.Dispatch<string>
    errorPassword: IError
    confirmPassword: string
    setConfirmPassword: React.Dispatch<string>
    errorConfirmPassword: IError
    handlePersonalInfosUpdate: () => void
    handleEmailUpdate: () => void
    handlePasswordUpdate: () => void
}

const BodyPageSection: FC<IProps> = ({
    firstname,
    setFirstname,
    errorFirstname,
    lastname,
    setLastname,
    errorLastname,
    email,
    setEmail,
    errorEmail,
    oldPassword,
    setOldPassword,
    errorOldPassword,
    password,
    setPassword,
    errorPassword,
    confirmPassword,
    setConfirmPassword,
    errorConfirmPassword,
    handlePersonalInfosUpdate,
    handleEmailUpdate,
    handlePasswordUpdate,
}) => {
    const { user } = useAuthContext()
    
    const [panel, setPanel] = useState<"personal" | "email" | "password" | "portfolio">("personal")
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowOldPassword(!showOldPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleClickShowConfirmPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    
    useEffect(() => {
        setFirstname(user!.firstname)
        setLastname(user!.lastname)
        setEmail(user!.email)
        setConfirmPassword("")
    }, [setFirstname, setLastname, setEmail, setConfirmPassword, user])

    return (
      <>
        <Grid container style={{ gap: 12, borderBottom: "1px solid #8a8888" }}>
          <Typography
            onClick={() => setPanel("personal")}
            style={{
              padding: 10,
              borderBottom:
                panel === "personal" ? "2px solid black" : undefined,
              cursor: "pointer",
            }}
          >
            Informations personnelles
          </Typography>
          <Typography
            onClick={() => setPanel("email")}
            style={{
              padding: 10,
              borderBottom: panel === "email" ? "2px solid black" : undefined,
              cursor: "pointer",
            }}
          >
            Modifier votre email
          </Typography>
          <Typography
            onClick={() => setPanel("password")}
            style={{
              padding: 10,
              borderBottom:
                panel === "password" ? "2px solid black" : undefined,
              cursor: "pointer",
            }}
          >
            Modifier votre mot de passe
          </Typography>
          <Typography
            onClick={() => setPanel("portfolio")}
            style={{
              padding: 10,
              borderBottom:
                panel === "portfolio" ? "2px solid black" : undefined,
              cursor: "pointer",
            }}
          >
            Portfolio
          </Typography>
        </Grid>
        {panel === "personal" && (
          <Grid
            item
            container
            direction="column"
            xs={12}
            md={8}
            lg={6}
            style={{ marginTop: 30, gap: 20 }}
          >
            <FormControl variant="outlined" style={{ flex: 1 }}>
              <InputLabel htmlFor="outlined-adornment-firsname">Nom</InputLabel>
              <OutlinedInput
                id="outlined-adornment-firstname"
                type="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                label="Nom"
                error={errorFirstname.isError}
              />
              {errorFirstname.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorFirstname.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" style={{ flex: 1 }}>
              <InputLabel htmlFor="outlined-adornment-lastname">
                Prénom
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-lastname"
                type="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                label="Prénom"
                error={errorLastname.isError}
              />
              {errorLastname.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorLastname.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-confirmpassword">
                Tapez votre mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmpassword"
                type={showNewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmr"
                error={errorConfirmPassword.isError}
              />
              {errorConfirmPassword.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorConfirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              onClick={handlePersonalInfosUpdate}
              style={{
                width: "fit-content",
                padding: "8px 12px 4px 12px",
                backgroundColor: "#423e3e",
                color: "white",
              }}
            >
              Confirmer la modification
            </Button>
          </Grid>
        )}
        {panel === "email" && (
          <Grid
            item
            container
            direction="column"
            xs={12}
            md={8}
            lg={6}
            style={{ marginTop: 30, gap: 20 }}
          >
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                error={errorEmail.isError}
              />
              {errorEmail.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorEmail.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-confirmpassword">
                Tapez votre mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmpassword"
                type={showNewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmr"
                error={errorConfirmPassword.isError}
              />
              {errorConfirmPassword.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorConfirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              onClick={handleEmailUpdate}
              style={{
                width: "fit-content",
                padding: "8px 12px 4px 12px",
                backgroundColor: "#423e3e",
                color: "white",
              }}
            >
              Confirmer la modification
            </Button>
          </Grid>
        )}
        {panel === "password" && (
          <Grid
            item
            container
            direction="column"
            xs={12}
            md={8}
            lg={6}
            style={{ marginTop: 30, gap: 20 }}
          >
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Ancien mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={errorOldPassword.isError}
              />
              {errorOldPassword.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorOldPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-confirmpassword">
                Nouveau mot de passe
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmpassword"
                type={showNewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmr"
                error={errorPassword.isError}
              />
              {errorPassword.isError && (
                <FormHelperText
                  style={{ color: "red", margin: "3px 0px 0px 0px" }}
                >
                  {errorPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              onClick={handlePasswordUpdate}
              style={{
                width: "fit-content",
                padding: "8px 12px 4px 12px",
                backgroundColor: "#423e3e",
                color: "white",
              }}
            >
              Confirmer la modification
            </Button>
          </Grid>
        )}
        {panel === "portfolio" && (
          <>{user && <UserPortfolioSectionPage userId={user?.id} />}</>
        )}
      </>
    );
}

export default BodyPageSection