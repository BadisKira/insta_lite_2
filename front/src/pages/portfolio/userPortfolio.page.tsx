import { Grid } from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import instaliteApi from "../../utils/axios/axiosConnection";
import { IPost } from "../../types/post.type";
import CreatePost from "../../components/post/createPost.component";
import FeedPageSection, { IVisibilityPosteType } from "../../pageSections/feed/feed.pageSection";
import { useState } from "react";
import { SelectVisibilityPostType } from "../../pageSections/feed/feed.pageSection";
const UserPortfolioPage = () => {
  const { token, user } = useAuthContext();
    const v = localStorage.getItem("visibilitypost");
   const [visibilityTypePost, setVisibilityTypePost] =
     useState<IVisibilityPosteType>(
       v && user && user.role !== "USER"
         ? (v as IVisibilityPosteType)
         : "public"
     );
  
  const { userId } = useParams();
	const getPostsForOneUser = async(page :number) => {
    instaliteApi.defaults.headers.common.Authorization = "Bearer " + token;
    if (!userId) return;
    const { data } = await instaliteApi.get<IPost[]>(
      `posts/user/${parseInt(userId)}?pageNumber=${
        page - 1
      }&pageLimit=2&visibilityType=${visibilityTypePost}`
    );
    return data;
  };

 

  return (
    <PageContainer withHeader={true}>
      <Grid container style={{ padding: "50px 0px" }}>
        <Grid>User ID : {userId}</Grid>

        {userId && <CreatePost userId={parseInt(userId)} />}

        <Grid container>
          <SelectVisibilityPostType
            visibilityTypePost={visibilityTypePost}
            setVisibilityTypePost={setVisibilityTypePost}
          />
          <FeedPageSection
            getFn={getPostsForOneUser}
            queryKey="userAllPosts"
            visibilityTypePost={visibilityTypePost}
            setVisibilityTypePost={setVisibilityTypePost}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserPortfolioPage;
