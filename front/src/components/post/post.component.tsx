import { IPost } from "../../types/post.type";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Collapse, useMediaQuery, useTheme } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ContentDialog from "./content.dialog.component";
import CommentSection from "../comment/commentSection.component";
import { useMutation } from "@tanstack/react-query";
import instaliteApi from "../../utils/axios/axiosConnection";
import { IUser } from "../../types/user.type";

const WIDTH_COMPONENT = 500;
const WIDTH_EXPAND_COMMENT = 850;

const WIDTH_CARD = 500;
const WIDTH_COMMENT = 350;

const HEIGHT_COMPONENT = 600;

const HEIGHT_CARD = HEIGHT_COMPONENT;
const HEIGHT_COMMENT_WHEN_EXPAND = 400;

const HEIGHT_COMPONENT_EXPAND = HEIGHT_CARD + HEIGHT_COMMENT_WHEN_EXPAND;

const Post: React.FC<IPost> = ({
  title,
  description,
  id,
  userFirstname,
  userLastname,
  createdAt,
  commentsNumber,
  likedUserIds
}) => {
  const [commentSectionOpen, setCommentSectionOpen] =
    React.useState<boolean>(false);

  const postRef = React.useRef();

  const openCommentSection = () => {
    setCommentSectionOpen(true);
  };

  const theme = useTheme();
  const pageIsSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openContentDialog, setOpenContentDialog] =
    React.useState<boolean>(false);




  const likeMutation = useMutation({
    mutationKey: ['like', id],
    mutationFn: async () => {
      const token = localStorage.getItem("token"); 
      if (!token) return;
      const response =  await instaliteApi.put(`/posts/${id}/like`, {}, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      return response.data;   
    }
    
  })

  return (
    <Box
      ref={postRef}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: pageIsSmall ? "column" : "row",
        marginX: "auto",
        marginTop: 2,
        width: {
          xs: "95vw",
          sm: "80vw",
          md: commentSectionOpen ? WIDTH_EXPAND_COMMENT : WIDTH_COMPONENT,
        },

        height: {
          xs: commentSectionOpen ? HEIGHT_COMPONENT_EXPAND : HEIGHT_COMPONENT,
          md: HEIGHT_COMPONENT,
        },
        // transitionDuration: "200ms",
        // transition: "ease-in-out",
      }}
    >
      <Card
        sx={{
          width: {
            xs: "90%",
            md: WIDTH_CARD,
          },
          height: HEIGHT_COMPONENT,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userFirstname.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={createdAt}
        />
        <CardMedia
          sx={{
            width: "100%",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenContentDialog(true);
          }}
        >
          <img
            src={`http://localhost:8080/api/resource/${id}`}
            alt={title}
            style={{ height: "100%" }}
          />

          <ContentDialog
            alt={title}
            contentType={"IMAGE"}
            fullScreen={false}
            openContentDialog={openContentDialog}
            setOpenContentDialog={setOpenContentDialog}
            srcContent={`http://localhost:8080/api/resource/${id}`}
          />
        </CardMedia>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            excepturi. Maxime et placeat accusamus possimus.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            right: {
              xs: "3%",
              sm: "5%",
              md: "-40px",
            },
            width: { xs: "15px", md: "20px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
            <LikeButton likeMutation={likeMutation} likes={likedUserIds} />
          
          <IconButton
            sx={{
              display: !commentSectionOpen ? "block" : "none",
            }}
            onClick={openCommentSection}
          >
            <NotesIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Typography
            fontSize={10}
            component={"p"}
            sx={{ display: !commentSectionOpen ? "block" : "none" }}
          >
            {commentsNumber}
          </Typography>
        </CardActions>
      </Card>

      <Collapse
        orientation={pageIsSmall ? "vertical" : "horizontal"}
        in={commentSectionOpen}
        mountOnEnter
        unmountOnExit
        onAnimationEnd={() => {
        }}
      >
        <Box
          height={{
            xs: HEIGHT_COMMENT_WHEN_EXPAND,
            md: HEIGHT_COMPONENT,
          }}
          width={{ xs: "90%", md: WIDTH_COMMENT }}
        >
          <CommentSection
            postId={id}
            setCommentSectionOpen={setCommentSectionOpen}
          />
        </Box>
      </Collapse>
    </Box>
  );
};
export default Post;

const LikeButton = ({ likes ,  likeMutation }: { likes:number[],likeMutation: any }) => {
  //  /{postId}/{userId}/like

  const {
    mutateAsync,
    data,
    isLoading,
    isError,
    isSuccess,
  } = likeMutation;

  const userString = localStorage.getItem("user");
  if (!userString) return;

  const user = JSON.parse(userString) as IUser;

  return (
    <>
      <IconButton onClick={async () => await mutateAsync()}>
        {likes.includes(user.id) ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteIcon />
        )}
      </IconButton>
      <Typography fontSize={8} component={"p"}>
        {(data && data.likedUserIds && isSuccess )? data.likedUserIds.length : likes.length}
        {isLoading && "loading..."}
        {isError && "error..."}
      </Typography>
    </>
  );
};
