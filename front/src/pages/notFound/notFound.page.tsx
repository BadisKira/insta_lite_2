import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import PageContainer from "../../components/PageContainer/PageContainer"

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <PageContainer withHeader={false}>
            <Typography variant="h3" color="hotpink">Page introuvable</Typography>
            <Button
                onClick={() => navigate(-1)}>
                    Revenir
            </Button>
        </PageContainer>
    )
}

export default NotFoundPage