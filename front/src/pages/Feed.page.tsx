import { Button, Container } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { instaliteApi } from "../utils/axios/axiosConnection";
import Post from "../components/post/post.component";
import { IPost } from "../types/post.type";
import PostSkeleton from "../components/post/post.skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CreatePost from "../components/post/createPost.component";
const LIMIT = 2;

const getPostsFn = async (page: number) => {
  const response = await instaliteApi.get<IPost[]>(
    `posts/all?pageNumber=${page - 1}&pageLimit=2`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
};

const FeedPage = () => {
  const {
    data: feedposts,
    isError,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feedposts"],
    queryFn: async ({ pageParam }) => await getPostsFn(pageParam), // pageParam === pageNumber}
    // select: (data) => ({
    //   pages: [...data.pages].reverse(),
    //   pageParams: [...data.pageParams].reverse(),
    // }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

  /***
   * The useInView hook makes it easy to monitor the inView state of your components. 
   * Call the useInView hook with the (optional) options you need. 
   * It will return an array containing a ref, the inView status and the current entry. 
   * Assign the ref to the DOM element you want to monitor, and the hook will report the status.
   *
   */
  const { ref, inView } = useInView({
    threshold: 0,
  });
    
    useEffect(() => { 
        console.log(inView);
        const fetchInView = async () => {
                if (!isFetchingNextPage && inView) 
                      await fetchNextPage();
        }
        fetchInView().then(res => res);        
    }, [inView]);
  return (
    <Container
      sx={{
        background: "red",
        display: "flex",
        flexDirection: "column",
        justifyItems: "start",
        alignItems: "center",
        rowGap: 3,
      }}
      >
          <CreatePost />

          <br/>
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
              {feedposts.pages.map((feedPostPage) => {
                return feedPostPage.map((feedpost) => (
                  <Post {...feedpost} key={feedpost.id} />
                ));
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
            <Button ref={ref}>LoadMore shit</Button>
          ) : (
            "arrete de scroller et va travailler"
          )}
        </>
      )}
    </Container>
  );
};

export default FeedPage;
