import { Grid } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import { IPost } from "../../types/post.type";
import FeedPageSection, {
  IVisibilityPosteType,
} from "../../pageSections/feed/feed.pageSection";
import { useState } from "react";
import { SelectVisibilityPostType } from "../../pageSections/feed/feed.pageSection";
import useAxiosPrivate from "../../hooks/useAxios";

const UserPortfolioSectionPage = ({ userId }: { userId: number }) => {
  const instaliteApi = useAxiosPrivate();
  const { token, user } = useAuthContext();
  const v = localStorage.getItem("visibilitypost");
  const [visibilityTypePost, setVisibilityTypePost] =
    useState<IVisibilityPosteType>(
      v && user && user.role !== "USER" ? (v as IVisibilityPosteType) : "public"
    );

  const getPostsForOneUser = async (page: number) => {
    if (!userId) return;
    const { data } = await instaliteApi.get<IPost[]>(
      `posts/user/${userId}?pageNumber=${
        page - 1
      }&pageLimit=2&visibilityType=${visibilityTypePost}`
    );
    return data;
  };

  return (
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
  );
};

export default UserPortfolioSectionPage;
