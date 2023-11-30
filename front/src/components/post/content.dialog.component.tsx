import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

type IContentDialog = {
  fullScreen?: boolean;
  openContentDialog: boolean;
  setOpenContentDialog: (open: boolean) => void;
  srcContent: string;
  alt: string;
  contentType: "IMAGE" | "VIDEO";
};
const ContentDialog: React.FC<IContentDialog> = ({
  fullScreen,
  openContentDialog,
  setOpenContentDialog,
  srcContent,
  alt,
  contentType = "IMAGE",
}) => {
  const displayContent = () => {
    if (contentType === "IMAGE")
      return (
        <img
          src={srcContent}
          style={{
            height: "100%",
            width: "100%",
          }}
          alt={alt}
        />
      );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openContentDialog}
      onClose={() => setOpenContentDialog(false)}
    >
      <DialogTitle position={"relative"}>
        {alt}{" "}
        <IconButton
          sx={{ position: "absolute", right: 1 }}
          onClick={() => {
            setOpenContentDialog(false);
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{displayContent()}</DialogContent>
    </Dialog>
  );
};

export default ContentDialog;
