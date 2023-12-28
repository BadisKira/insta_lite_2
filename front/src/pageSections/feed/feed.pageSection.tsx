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
import { IVisibilityPosteType } from "../../pages/feed/Feed.page";

export interface IFeedSection {
  getFn: (page: number) => Promise<any>;
  visibilityTypePost?: IVisibilityPosteType;
  setVisibilityTypePost?: (p: IVisibilityPosteType) => void;
}

const FeedPageSection: React.FC<IFeedSection> = ({
  getFn,
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
    queryKey: ["feedposts"],
    getResourceFn: getFn,
  });

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
    console.log(inView);
    const fetchInView = async () => {
      if (!isFetchingNextPage && inView) await fetchNextPage();
    };
    fetchInView().then((res) => res);
  }, [inView]);

  useEffect(() => {
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
        <h1>Fetching next shit</h1>
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
