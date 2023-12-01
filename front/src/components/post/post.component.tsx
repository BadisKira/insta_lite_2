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
import { Box, Collapse } from "@mui/material";

import CommentIcon from "@mui/icons-material/Comment";
import ContentDialog from "./content.dialog.component";
import CommentSection from "../comment/commentSection.component";

const Post: React.FC<IPost> = ({
  title,
  description,
  id,
  userName,
  createdAt,
}) => {
  const [commentSectionOpen, setCommentSectionOpen] =
    React.useState<boolean>(false);

  const postRef = React.useRef();

  const openCommentSection = () => {
    setCommentSectionOpen(true);
  };

  const [openContentDialog, setOpenContentDialog] =
    React.useState<boolean>(false);
  return (
    <Box
      ref={postRef}
      sx={{
        display: "flex",
        marginX: "auto",
        marginTop: 2,
        position: "relative",

        width: commentSectionOpen ? 750 : 450,
        transitionDuration: "200ms",
        transition: "ease-in-out",
      }}
    >
      <Card
        sx={{
          width: {
            xs: "90%",
            sm: 450,
          },
          height: {
            xs: 550,
          },

          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
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
            height: 350,
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
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <IconButton
        sx={{
          position: "absolute",
          bottom: 1,
          right: 1,
          display: !commentSectionOpen ? "block" : "none",
        }}
        onClick={openCommentSection}
      >
        <CommentIcon sx={{ marginTop: "auto", fontSize: 28 }} />
      </IconButton>

      <Collapse
        orientation="horizontal"
        in={commentSectionOpen}
        mountOnEnter
        unmountOnExit
      >
        <Box  height={"100%"} width={300}>
          <CommentSection idPost={id} setCommentSectionOpen={setCommentSectionOpen} />
        </Box>
      </Collapse>
    </Box>
  );
};
export default Post;

