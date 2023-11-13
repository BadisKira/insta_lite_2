import { FC } from "react"
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


interface IProps {
    linkPath: "/" | "/auth" 
}

const EntryHeader: FC<IProps> = ({ linkPath }) => {
    const navigate = useNavigate()

    const pageDict = {
        "/": {
            path: "/",
            text: "Page d'accueil",
        },
        "/auth": {
            path: "/auth",
            text: "Se connecter",
        }
    }

    const pageDetails = pageDict[linkPath]

    const handleClick = () => {
        navigate(pageDetails.path)
    }

    return (
        <AppBar position="sticky" style={{ height: "fit-content", backgroundColor: " #fdfdfd" }}>
            <Toolbar>
                <Grid container justifyContent="space-between" padding="4px 20%">
                    <Typography variant="h6" color="#197fe6" fontWeight="bold">Instalite II</Typography>

                    <Button 
                        onClick={handleClick}
                        style={{ 
                            width: "fit-content", 
                            padding: "6px 12px", 
                            backgroundColor: "#197fe6", 
                            color: "white" 
                        }}>
                            {pageDetails.text}
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default EntryHeader