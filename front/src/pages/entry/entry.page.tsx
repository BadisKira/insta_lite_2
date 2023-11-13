import { Grid } from "@mui/material"
import EntryHeader from "../../components/EntryHeader/EntryHeader"
import PageContainer from "../../components/PageContainer/PageContainer"

const EntryPage = () => {
    
    return (
        <PageContainer>
            <EntryHeader linkPath="/auth" />
            <Grid flex={1}>

            </Grid>
        </PageContainer>
    )
}

export default EntryPage