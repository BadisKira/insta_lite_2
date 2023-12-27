import { Button, Container, Typography } from "@mui/material";
import instaliteApi from "../../utils/axios/axiosConnection";
import Post from "../../components/post/post.component";
import { IPost } from "../../types/post.type";
import PostSkeleton from "../../components/post/post.skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CreatePost from "../../components/post/createPost.component";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { useAuthContext } from "../../hooks/useAuthContext.hook";

const getPostsFn = async (page: number) => {
  const response = await instaliteApi.get<IPost[]>(
    `posts/all?pageNumber=${page - 1}&pageLimit=2`
  );
  return response.data;
};

const FeedPageSection = () => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePaginatedQuery({
    getResourceFn: getPostsFn,
    limit: 2,
    queryKey: ["feedposts"],
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

  /**User authentification */
  const { user } = useAuthContext();

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
      {user && user.role === "ADMIN" && <CreatePost />}

      <br />
      {isLoading ? (
        <>
          <PostSkeleton />
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
            <Button ref={ref}>Charger plus </Button>
          ) : (
            <Typography variant="caption">Aucun nouveau post à voir</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default FeedPageSection;
