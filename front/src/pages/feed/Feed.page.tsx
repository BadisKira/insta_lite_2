
import { useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import FeedPageSection, { IVisibilityPosteType, SelectVisibilityPostType } from "../../pageSections/feed/feed.pageSection";
import { IPost } from "../../types/post.type";
import instaliteApi from "../../utils/axios/axiosConnection";
import { useAuthContext } from "../../hooks/useAuthContext.hook";

/***
 * 
 * Ce que je veux faire c'est mettre en place un placeholder po
 */
const FeedPage = () => {
  /**User authentification */
  const { user } = useAuthContext();
  const v = localStorage.getItem("visibilitypost");
  const [visibilityTypePost, setVisibilityTypePost] =
    useState<IVisibilityPosteType>((v && user && user.role !== "USER") ? (v as IVisibilityPosteType) : "public");
  const getPostsFn = async (page: number) => {
    const response = await instaliteApi.get<IPost[]>(
      `posts/${visibilityTypePost}?pageNumber=${page - 1}&pageLimit=2`
    );
    return response.data;
  };

  return (
    <PageContainer withHeader={true}>
      <SelectVisibilityPostType
        visibilityTypePost={visibilityTypePost}
        setVisibilityTypePost={setVisibilityTypePost}
      />
      <FeedPageSection
        getFn={getPostsFn}
        queryKey="feedposts"
        visibilityTypePost={visibilityTypePost}
        setVisibilityTypePost={setVisibilityTypePost}
      />
    </PageContainer>
  );
};

export default FeedPage;


