import { Grid } from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useParams } from "react-router-dom";
import CreatePost from "../../components/post/createPost.component";
import UserPortfolioSectionPage from "../../pageSections/portfolio/userPortfolio.pageSection";


const UserPortfolioPage = () => {
  const { userId } = useParams();

  return (
    <PageContainer withHeader={true}>
      <Grid container style={{ padding: "50px 0px" }}>
        <Grid>User ID : {userId}</Grid>

        {userId && <CreatePost userId={parseInt(userId)} />}
        {userId && <UserPortfolioSectionPage userId={parseInt(userId)} />}
      </Grid>
    </PageContainer>
  );
};

export default UserPortfolioPage;
