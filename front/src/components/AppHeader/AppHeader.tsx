import { FC } from "react"
import { AppBar, Grid, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useAuthContext } from "../../hooks/useAuthContext.hook"


interface IProps {
}

const AppHeader: FC<IProps> = () => {
    const { user } = useAuthContext()

    return (
        <AppBar position="sticky" style={{ height: 80, backgroundColor: " #363232" }}>
            <Toolbar style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", padding: 0, margin: 0,}}>
                <Grid item container justifyContent="space-between" alignItems="center" xs={10} lg={8} height="100%">
                    <Typography 
                        variant="h6" 
                        color="#f8fcff" 
                        fontWeight="bold"
                        flex={1}>
                            Instalite II
                    </Typography>

                    <Grid 
                        flex={2}
                        container 
                        justifyContent="center" 
                        alignItems="center" 
                        width="fit-content"
                        color="white"
                        style={{ gap: 16 }}>
                            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                                <Typography style={{ opacity: "0.7" }}>Accueil</Typography>
                            </Link>
                    </Grid>

                    <Grid 
                        flex={1} 
                        container 
                        justifyContent="flex-end">
                            <Link to="/profil" style={{ textDecoration: "none", color: "white" }}>
                                <Grid container justifyContent="center" alignItems="center" style={{ gap: 4 }}>
                                    <AccountCircleOutlinedIcon style={{ width: 30, height: 30 }} />
                                    <Typography>{user?.firstname} {user?.lastname}</Typography>
                                </Grid>
                            </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader