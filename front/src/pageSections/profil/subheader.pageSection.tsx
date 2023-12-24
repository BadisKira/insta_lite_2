import { Button, Grid, Typography } from '@mui/material'
import { useAuthContext } from '../../hooks/useAuthContext.hook'

const SubHeaderPageSection = () => {
    const { user, logOut } = useAuthContext()
    
    return (
        <Grid container justifyContent="space-between" padding="20px 0px">
            <Grid flex={1} container direction="column">
                <Typography variant="h4">{user?.firstname} {user?.lastname}</Typography>
                <Typography style={{ opacity: "0.7" }}>ID : {user?.id}</Typography>
                <Typography style={{ opacity: "0.7" }}>Email: {user?.email}</Typography>
            </Grid>
            <Grid container alignItems="flex-end" height="100%" width="fit-content">
                <Button onClick={logOut} style={{ backgroundColor: "#474444", padding: "8px 12px 4px 12px", color: "#ff9b9b" }}>
                    Déconnecter
                </Button>
            </Grid>
        </Grid>
    )
}

export default SubHeaderPageSection