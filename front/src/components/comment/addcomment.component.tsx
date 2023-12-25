import { Send } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import  instaliteApi  from "../../utils/axios/axiosConnection";
import { ICreateComment, queryKeyComment } from "../../types/comment.type";
import Loader from "../Loader";

const EMPTYCONTENT = "";
const addCommentFn = async (comment: ICreateComment) => {
  // const user = localStorage.getItem("authData");
  // let token;
  // if (user) {
  //   token = JSON.parse(user).token;
  // }
  const response = await instaliteApi.post(`comments`, comment, {
    headers: {
      "Content-Type": "Application/json",
      //Authorization: "Bearer " + token,
    },
  });

  return response.data;
};

const AddComment = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState<string>("");
  const userId = 1;
  const queryClient = useQueryClient();
  const {
    mutateAsync: addCommentMutate,
    isPending,
    isError,
  } = useMutation({
    mutationKey: [],
    mutationFn: async () => await addCommentFn({ content, postId, userId }),
    onSuccess: () => {
      setContent(EMPTYCONTENT);
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
