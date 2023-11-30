import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { ICreatePost } from "../../types/post.type";
import { Button, Chip, Grid, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Done } from "@mui/icons-material";



const EMPTYPOST:ICreatePost= {
  data: null,
  isPublic: true,
  description: "",
  postType: "IMAGE",
  title: "",
  userId: 0
}

const createPostFn = async (post: ICreatePost) => {
  const postFormData = new FormData();

  postFormData.append("title", post.title);
  postFormData.append("description", post.description);
  postFormData.append("isPublic", post.isPublic ? "true" : "false");

  if(post.data ) postFormData.append("data", post.data);
  postFormData.append("postType", "IMAGE");
  postFormData.append("userId","1");

  // const token ="12345789feztyfuhebhjav ce fervheh jueiz fveurihvjzbjdsvfv ";

  const response = await axios.postForm(
    `http://localhost:8080/api/posts`,
    postFormData,
    { headers: { "Content-Type": "Application/json" } }
  );
  return await response.data;
};

const CreatePost = () => {
  const [postInfo, setPostInfo] = useState<ICreatePost | undefined>(undefined);
  const queryPost = useQueryClient();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //@ts-ignore
    setPostInfo((prev) => {
      if (e.target.name && e.target.value)
        return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const {
    mutateAsync: createPostMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["feedposts"],
    mutationFn: async (post: ICreatePost) => await createPostFn(post),
    onError: () => {
      // faire un toast
    },
    onSuccess: () => {
      // faire un toast
      queryPost.invalidateQueries({
        queryKey: ["feedposts"],
      });
      setPostInfo(EMPTYPOST);
    },
  });

  console.log(postInfo?.data);
  return (
    <Paper elevation={10} sx={{ width: "100%" , marginTop:3  , padding:2}}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(postInfo);
          if (postInfo) await createPostMutate({ ...postInfo, userId: 1 });

          if (isSuccess) {
            alert("isSucces");
          }
        }}
      >
        <Grid container gap={1}>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={postInfo?.title}
                label="Title of the post"
                name="title"
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept={"image/*"}
                required
                name="data"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                  if(postInfo)
                  setPostInfo({...postInfo , data: e.target.files ? e.target.files[0] : null }) ;
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              value={postInfo?.description}
              label="Description of the post"
              name="description"
              multiline
              fullWidth
              rows={2}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <CustomCheckBoxChip
              value={postInfo?.isPublic}
              setValue={setPostInfo}
              name="isPublic"
            />
          </Grid>
        </Grid>
        {isPending ? (
          "Loading......"
        ) : (
          <Button
            type="submit"
            variant="outlined"
            sx={{
              width: "150px",
              marginY: "10px",
            }}
          >
            Create{" "}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default CreatePost;

//@ts-ignore
const CustomCheckBoxChip = ({ value, setValue, name }) => {
  const handleClick = () => {
    //@ts-ignore
    setValue((prev) => ({ ...prev, [name]: !value }));
  };
  return (
    <Stack gap={1}>
      <Chip
        size="small"
        sx={{ width: "80px", fontSize: 10 }}
        label={value ? "Public" : "Private"}
        variant={"outlined"}
        onClick={handleClick}
        icon={<Done />}
      />
    </Stack>
  );
};
