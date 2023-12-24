import { Grid, Typography } from '@mui/material'


const PortfolioPageSection = () => {
    return (
        <Grid container direction="column" style={{ height: "100%" }}>
            <Grid container justifyContent="center" alignItems="center" style={{ padding: "10%", }}>
                <Typography variant="h2">
                    Nous vous rapprochons des personnes et des choses que vous aimez.
                </Typography>
            </Grid>
            <Grid flex={1} container>
            </Grid>
        </Grid>
    )
}

export default PortfolioPageSection