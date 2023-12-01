import {
  Box,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { instaliteApi } from "../../utils/axios/axiosConnection";
import { IComment, queryKeyComment } from "../../types/comment.type";
import { Close } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AddComment from "./addcomment.component";
import CommentItem from "./commentItem.component";

const CommentSection = ({
  idPost,
  setCommentSectionOpen,
}: {
  idPost: string;
  setCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const getCommentsByPost = async (page: number) => {
    const user = localStorage.getItem("authData");
    let token;
    if (user) {
      token = JSON.parse(user).token;
    }
    console.log(token);

    const response = await instaliteApi.get<IComment[]>(
      `comments/${idPost}?pageNumber=${page - 1}&pageLimit=2`,
      {
        headers: {
          "Content-Type": "Application/json",
          // Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  } = usePaginatedQuery({
    getResourceFn: getCommentsByPost,
    limit: 2,
    queryKey: [queryKeyComment, idPost],
  });

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
  return (
    <Stack position={"relative"} width={"100%"} height={"100%"} bgcolor={"darkgoldenrod"} >
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0}}
        onClick={() => {
          setCommentSectionOpen(false);
        }}
      >
        <Close />
      </IconButton>

      {isLoading ? (
        <>Shit sle</>
      ) : (
        <>
          {isError && <>Error</>}
          {isSuccess && (
            <>
              {data?.pages.map((commentsPage: IComment[]) => {
                if (commentsPage.length)
                  return commentsPage.map((comment) => (
                    <CommentItem {...comment} key={comment.id} />
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
            ""
          )}
        </>
      )}

      <Box position={"absolute"} bgcolor="yellowgreen" bottom={0} width={"100%"} > 
        <AddComment postId={idPost} key={"ddver8465"} />
      </Box>
    </Stack>
  );
};


export default CommentSection;
