import { Avatar, Typography , Box } from "@mui/material";
import { IComment } from "../../types/comment.type";

const CommentItem: React.FC<IComment> = ({
  content,
  createdAt,
  userName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: 1,
        gap:1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          
        }}
      >
        <Avatar>{userName.charAt(0)}</Avatar>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={1/2}>
        <Typography fontSize={14}>{content}{content}{content}</Typography>
        <Typography fontSize={12}>21/27/2023</Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
