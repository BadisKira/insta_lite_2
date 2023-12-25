import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import  instaliteApi  from "../../utils/axios/axiosConnection";
import { IComment, queryKeyComment } from "../../types/comment.type";
import { Close } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AddComment from "./addcomment.component";
import CommentItem from "./commentItem.component";
import Loader from "../Loader";

const CommentSection = ({
  idPost,
  commentsNumber,
  setCommentSectionOpen,
}: {
  idPost: string;
  commentsNumber:number;
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
          <span style={{ marginLeft: 10, fontSize: 16 }}>{commentsNumber}</span>
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
          <>{hasNextPage ? <Button ref={ref}>LoadMore shit</Button> : ""}</>
        )}
      </Stack>

      <Box width={"100%"}>
        <AddComment postId={idPost} key={"ddver8465"} />
      </Box>
    </Stack>
  );
};


export default CommentSection;
