import { Avatar, Typography , Box } from "@mui/material";
import { IComment } from "../../types/comment.type";

const CommentItem: React.FC<IComment> = ({
  content,
  createdAt,
  userFirstname,
  userLastname,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: 1,
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Avatar title={userFirstname + " " + userLastname} sx={{ fontSize: 14, width: 30, height: 30 }}>
          {userFirstname.charAt(0).toUpperCase()}
        </Avatar> 
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        gap={1 / 2}
      >
        <Typography fontSize={14}>{content}</Typography>
        <Typography fontSize={10}>
          {userFirstname} -- 
          {createdAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentItem;
