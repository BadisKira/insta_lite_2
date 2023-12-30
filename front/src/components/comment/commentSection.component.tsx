import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { IComment, queryKeyComment } from "../../types/comment.type";
import { Close } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AddComment from "./addcomment.component";
import CommentItem from "./commentItem.component";
import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { ProtectedComponent } from "../../router/ProtectedComponent";
import useAxiosPrivate from "../../hooks/useAxios";

const CommentSection = ({
  postId,
  setCommentSectionOpen,
}: {
  postId: string;
  setCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
  const instaliteApi = useAxiosPrivate();
  const getCommentsByPost = async (page: number) => {
    // let token =localStorage.getItem("token");
    const response = await instaliteApi.get<IComment[]>(
      `comments/${postId}?pageNumber=${page - 1}&pageLimit=2`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  };

  const {
    data: commentsCount,
    isSuccess: isCountSuccess,
    isLoading: isCountLoading,
    refetch,
  } = useQuery({
    queryKey: ["countComments", postId],
    queryFn: async () => {
      const response = await instaliteApi.get(`comments/count/${postId}`);
      return response.data;
    },
  });

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
    queryKey: [queryKeyComment, postId],
  });

  const { ref, inView } = useInView({
    threshold: 1 / 2,
  });

  useEffect(() => {
    const fetchInView = async () => {
      if (!isFetchingNextPage && inView) await fetchNextPage();
    };
    fetchInView().then((res) => res);
    refetch();
  }, [inView]);
  return (
    <Stack
      position={"relative"}
      width={"100%"}
      height={"100%"}
      bgcolor={"white"}
      boxShadow={2}
      sx={{
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        boxShadow={1 / 2}
        paddingLeft={0.5}
      >
        <Typography variant="h6">
          Commentaires
          <span style={{ marginLeft: 10, fontSize: 16 }}>
            {isCountLoading && <Loader size={6} />}
            {isCountSuccess && commentsCount.commentsCount}
          </span>
        </Typography>
        <IconButton
          // sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => {
            setCommentSectionOpen(false);
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Stack
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          wordBreak: "break-word",
        }}
      >
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
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Loader color="red" size={30} />
          </Box>
        ) : (
          <>
            {hasNextPage ? (
              <Button variant="text" size="small" ref={ref}>
                load more
              </Button>
            ) : (
              <Typography fontSize={10} color={"darkgray"} textAlign={"center"}>
                aucun nouveau commentaire{" "}
              </Typography>
            )}
          </>
        )}
      </Stack>

      <Box width={"100%"}>
        <ProtectedComponent allowedRoles={[]}>
          <AddComment
            postId={postId}
            key={"ddver8465"}
            refetchCount={refetch}
          />
        </ProtectedComponent>
      </Box>
    </Stack>
  );
};

export default CommentSection;
