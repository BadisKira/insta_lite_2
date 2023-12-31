import { Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ICreateComment, queryKeyComment } from "../../types/comment.type";
import Loader from "../Loader";
import useAxiosPrivate from "../../hooks/useAxios";

const EMPTYCONTENT = "";

const AddComment = ({
  postId,
  refetchCount,
}: {
  postId: string;
  refetchCount: () => void;
}) => {
  const [content, setContent] = useState<string>("");
  const userId = 1;
  const queryClient = useQueryClient();

  const instaliteApi = useAxiosPrivate();

  const addCommentFn = async (comment: ICreateComment) => {
    const response = await instaliteApi.post(`comments`, comment, {
      headers: {
        "Content-Type": "Application/json",
      },
    });

    return response.data;
  };

  const {
    mutateAsync: addCommentMutate,
    isPending,
    isError,
  } = useMutation({
    mutationKey: [],
    mutationFn: async () => await addCommentFn({ content, postId, userId }),
    onSuccess: () => {
      setContent(EMPTYCONTENT);
      refetchCount();
      queryClient.invalidateQueries({ queryKey: [queryKeyComment, postId] });
    },
  });



  return (
    <Box padding={1}>
      <TextField
        fullWidth
        sx={{
          fontSize: 8,
        }}
        size="small"
        label="Commentaire"
        error={isError}
        helperText={isError ? "error lors de merde" : ""}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <>
                {content.length > 0 && (
                  <IconButton size="small" onClick={() => addCommentMutate()}>
                    {isPending ? (
                      <Loader size={8} />
                    ) : (
                      <Send fontSize="small" />
                    )}
                  </IconButton>
                )}
              </>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AddComment;
