import { Grid } from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import instaliteApi from "../../utils/axios/axiosConnection";
import { IPost } from "../../types/post.type";
import CreatePost from "../../components/post/createPost.component";
import FeedPageSection from "../../pageSections/feed/feed.pageSection";

const UserPortfolioPage = () => {
  const { token } = useAuthContext();
  const { userId } = useParams();
	const getPostsForOneUser = async(page :number) => {
    instaliteApi.defaults.headers.common.Authorization = "Bearer " + token;
    if (!userId) return;
    const { data } = await instaliteApi.get<IPost[]>(
      `posts/user/${parseInt(userId)}?pageNumber=${page - 1}&pageLimit=2`
    );
    return data;
  };

  return (
    <PageContainer withHeader={true}>
      <Grid container style={{ padding: "50px 0px" }}>
        <Grid>User ID : {userId}</Grid>

        {userId && <CreatePost userId={parseInt(userId)} />}

        <Grid container>
          <FeedPageSection getFn={getPostsForOneUser} queryKey="userAllPosts"/>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserPortfolioPage;
