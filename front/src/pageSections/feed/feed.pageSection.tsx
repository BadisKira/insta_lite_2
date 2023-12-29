import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import Post from "../../components/post/post.component";
import { IPost } from "../../types/post.type";
import PostSkeleton from "../../components/post/post.skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import {
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export type IVisibilityPosteType = "public" | "private" | "all";


export interface IFeedSection {
  getFn: (page: number) => Promise<any>;
  queryKey: string,
  visibilityTypePost?: IVisibilityPosteType;
  setVisibilityTypePost?: (p: IVisibilityPosteType) => void;
}

const FeedPageSection: React.FC<IFeedSection> = ({
  getFn,
  queryKey,
  visibilityTypePost,
}) => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = usePaginatedQuery({
    limit: 2,
    queryKey: [queryKey],
    getResourceFn: getFn,
  });

  console.log("HAS NEXT Page ??? ", hasNextPage);

  /***
   * The useInView hook makes it easy to monitor the inView state of your components.
   * Call the useInView hook with the (optional) options you need.
   * It will return an array containing a ref, the inView status and the current entry.
   * Assign the ref to the DOM element you want to monitor, and the hook will report the status.
   *
   */
  const { ref, inView } = useInView({
    threshold: 1 / 2,
  });

  useEffect(() => {
    const fetchInView = async () => {
      if (!isFetchingNextPage && inView) await fetchNextPage();
    };
    fetchInView().then((res) => res);
  }, [inView]);

  useEffect(() => {
    if (visibilityTypePost)
      refetch().then((res) => {
        console.log(res);
      });
  }, [visibilityTypePost]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "start",
        alignItems: "center",
        rowGap: 1,
      }}
    >
      {isLoading ? (
        <>
          <PostSkeleton />
        </>
      ) : (
        <>
          {isError && <>Error</>}
          {isSuccess && (
            <>
              {data?.pages.map((feedPostPage: IPost[]) => {
                if (feedPostPage.length > 0) {
                  return feedPostPage.map((feedpost) => (
                    <Post
                      {...feedpost}
                      //@ts-ignore
                      isPublic={feedpost.public}
                      key={feedpost.id}
                      // indexInPage={index}
                      // page={pageNumber}
                    />
                  ));
                }
              })}
            </>
          )}
        </>
      )}

      {isFetchingNextPage ? (
        <h1>Fetching next </h1>
      ) : (
        <>
          {hasNextPage ? (
            <Button ref={ref}>Charger plus</Button>
          ) : (
            <Typography variant="caption">Aucun nouveau post à voir</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default FeedPageSection;

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