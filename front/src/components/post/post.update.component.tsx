import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMutation } from "@tanstack/react-query";
import { IPost, IUpdatePost } from "../../types/post.type";
import toast from "react-hot-toast";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { queryClient } from "../../main";
import useAxiosPrivate from "../../hooks/useAxios";
type IProps = {
  open: boolean;
  handleClose: () => void;
  anchorEl: any;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  post: IPost;
  // indexInPage: number;
  // page: number;
};

interface IPagesArray {
  pageParams: number[];
  pages: Array<[IPost[], any]>;
}
/***
 * export interface IPost {
  id: string;
  title: string;
  description: string;
  userId: number;
  userFirstname: string;
  userLastname: string;
  public: boolean;
  createdAt: string;
  commentsNumber: number;
  likedUserIds: number[];
}
 * 
 */
/**1- Rendre un post public ou non  */
/**Il suffirait juste d'envoyer une requette de modificationn et de changer uniquement sa visibilité ? */
/**2- Lancer un update ou non : est ce que je dois faire un modal qui vas modifier le post actuellement
 * selectionné pour la modification  ensuite enviyer une requetteback end et une fois que le retour est de 20
 * je modifie directement le cache surt le cote front end et hop la on y voit que du feux
 * ???
 */
/**3- Je sais pas pour l'instant  */

export interface ITogglePost {
  postId: string;
  isPublic: boolean;
}

const ToggleVisibility = ({ postId, isPublic }: ITogglePost) => {
  const instaliteApi = useAxiosPrivate();
  // create mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const toggleFormData = new FormData();
      toggleFormData.append("isPublic", isPublic ? "false" : "true");

      const response = await instaliteApi.patchForm(
        `posts/${postId}`,
        toggleFormData
      );
      return response;
    },
    onSuccess: () => {
      // get the visibility from local storage if the new visibility of the post doesn't match
      // the i'll delete it from here
      const visiblityRecherche = localStorage.getItem("visibilitypost");
      const oldPagesArray = queryClient.getQueryData([
        "feedposts",
      ]) as IPagesArray;
      const newPagesArray =
        oldPagesArray?.pages.map((page: IPost[]) =>
          page.filter((p: IPost) => {
            if (p.id == postId) {
              if (visiblityRecherche) {
                if (visiblityRecherche === "all")  
                  return true;
                 else return false;
              }
            } else return true;
          }).map(p => { if (p.id === postId) return { ...p, isPublic: !isPublic, public: !isPublic }; else return p; })
        ) ?? [];

      queryClient.setQueryData(["feedposts"], (data: any) => ({
        pages: newPagesArray,
        pageParams: data.pageParams,
      }));
      return;
    },
    onError: (response: any) => {
      const data = response.response.data;
      toast.error(data.message);
      return;
    },
  });
  return (
    <>
      <Typography onClick={async () => await mutateAsync()}>
        {isPending && <>load.....</>}
        <>Changer vers {isPublic ? "privée" : "publique"}</>
      </Typography>
    </>
  );
};

const DeletePost = ({
  postId,
}: //handleClose,
{
  postId: string;
  handleClose: () => void;
}) => {
  const [isToDelete, setIsToDelete] = useState<boolean>(false);
  const instaliteApi = useAxiosPrivate();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await instaliteApi.delete(`posts/${postId}`);
      return response;
    },
    onSuccess: () => {
      const oldPagesArray = queryClient.getQueryData([
        "feedposts",
      ]) as IPagesArray;
      const newPagesArray =
        oldPagesArray?.pages.map((page) =>
          page.filter((val) => val.id !== postId)
        ) ?? [];

      queryClient.setQueryData(["feedposts"], (data: any) => ({
        pages: newPagesArray,
        pageParams: data.pageParams,
      }));
      return;
    },
    onError: (response: any) => {
      const data = response.response.data;
      toast.error(data.message);
      return;
    },
  });

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <span
        onClick={() => {
          setIsToDelete(true);
        }}
      >
        Supprimer
      </span>

      <Box sx={{ transform: "translateX(12px)" }}>
        {isToDelete && (
          <>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setIsToDelete(false);
              }}
            >
              <ArrowBackIosNewIcon fontSize="inherit" sx={{ color: "green" }} />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={async () => await mutateAsync()}
            >
              <DeleteIcon fontSize="inherit" sx={{ color: "red" }} />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

const PostUpdateComponent = ({
  post,
  open,
  handleClose,
  anchorEl,
  // indexInPage,
  // page,
  handleClick,
}: IProps) => {

  return (
    <>
      <IconButton
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ToggleVisibility postId={post.id} isPublic={post.isPublic} />{" "}
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <UpdatePost
            post={post}
            onClose={handleClose}
            // indexInPage={indexInPage}
            // page={page}
          />
        </MenuItem>
        <MenuItem>
          <DeletePost handleClose={handleClose} postId={post.id} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostUpdateComponent;

interface IPostUpdateProps {
  post: IPost;
  indexInPage?: number;
  page?: number;
  onClose: () => void;
}

const UpdatePost: React.FC<IPostUpdateProps> = ({ post, onClose }) => {
  const instaliteApi = useAxiosPrivate();

  const [updatedPost, setUpdatedPost] = useState<IUpdatePost>({
    title: post.title,
    data: null,
    isPublic: post.isPublic,
    description: post.description,
  });
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const updatePostFormData = new FormData();

      updatePostFormData.append("title", updatedPost.title);
      updatePostFormData.append("description", updatedPost.description);
      updatePostFormData.append(
        "isPublic",
        updatedPost.isPublic ? "true" : "false"
      );

      if (updatedPost.data) updatePostFormData.append("data", updatedPost.data);

      const response = await instaliteApi.patchForm(
        `posts/${post.id}`,
        updatePostFormData,
        {
          headers: { "Content-Type": "Application/json" },
        }
      );
      return response;
    },
    onSuccess: (response) => {
      const oldPagesArray = queryClient.getQueryData([
        "feedposts",
      ]) as IPagesArray;

      const newPagesArray =
        oldPagesArray?.pages.map((page: IPost[]) =>
          page.map((p: IPost) => {
            if (p.id == post.id) {
              return response.data;
            } else {
              return p;
            }
          })
        ) ?? [];

      queryClient.setQueryData(["feedposts"], (data: any) => ({
        pages: newPagesArray,
        pageParams: data.pageParams,
      }));

      toast.success("Modification reussi");
      onClose();
      return;
    },
    onError: (response: any) => {
      const data = response.response.data;
      toast.error(data.message);
      return;
    },
  });

  return (
    <Box>
      <Typography
        onClick={() => {
          setOpenUpdateModal(true);
        }}
      >
        Modifier le post{" "}
      </Typography>
      <Modal open={openUpdateModal} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Modifier Post
          </Typography>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "100%", mb: 2 } }}
          >
            <TextField
              size="small"
              label="Title"
              name="title"
              value={updatedPost.title}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              size="small"
              label="Description"
              name="description"
              value={updatedPost.description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={2}
            />
            <Box>
              <input
                type="file"
                accept={"image/*"}
                required
                name="data"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (updatedPost)
                    setUpdatedPost({
                      ...updatedPost,
                      data: e.target.files ? e.target.files[0] : null,
                    });
                }}
              />

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setUpdatedPost({
                    ...updatedPost,
                    data: null,
                  });
                }}
              >
                clear
              </Button>
            </Box>
            {/* Add other TextField components for updating post properties */}
          </Box>
          {isPending ? (
            <>loading....</>
          ) : (
            <>
              <Button onClick={async () => await mutateAsync()}>Update</Button>
              <Button onClick={onClose}>Cancel</Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
