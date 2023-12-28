import {
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import FeedPageSection from "../../pageSections/feed/feed.pageSection";
import { IPost } from "../../types/post.type";
import instaliteApi from "../../utils/axios/axiosConnection";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import CreatePost from "../../components/post/createPost.component";
export type IVisibilityPosteType = "public" | "private" | "all";

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
      {user && user.role === "ADMIN" && <CreatePost />}

      <SelectVisibilityPostType
        visibilityTypePost={visibilityTypePost}
        setVisibilityTypePost={setVisibilityTypePost}
      />
      <FeedPageSection
        getFn={getPostsFn}
        visibilityTypePost={visibilityTypePost}
        setVisibilityTypePost={setVisibilityTypePost}
      />
    </PageContainer>
  );
};

export default FeedPage;

export function SelectVisibilityPostType({
  visibilityTypePost,
  setVisibilityTypePost,
}: {
  visibilityTypePost: IVisibilityPosteType;
  setVisibilityTypePost: (p: IVisibilityPosteType) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setVisibilityTypePost(event.target.value as IVisibilityPosteType);
    localStorage.setItem("visibilitypost", event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel>Choisissez le type post </InputLabel>
        <Select value={visibilityTypePost} label="Age" onChange={handleChange}>
          <MenuItem value={"public"}>Publique</MenuItem>
          <MenuItem value={"private"}>Privée</MenuItem>
          <MenuItem value={"all"}>Tout</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
