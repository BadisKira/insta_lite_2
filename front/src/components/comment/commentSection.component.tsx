import { IconButton } from "@mui/material";

const CommentSection = ({
    setCommentSectionOpen,
  }: {
    setCommentSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <>
        <IconButton
          onClick={() => {
            setCommentSectionOpen(false);
          }}
        >
          X
        </IconButton>
        Comment Section mon fils
      </>
    );
  };


  export default CommentSection ;
  