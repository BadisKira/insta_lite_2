import React from "react";
import { Box, Typography, InputLabel } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
// import FileUploadDefaultImage from "./FileUploadDefaultImage.png";

export type FileUploadProps = {
  imageButton?: boolean;
  accept: string;
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

// const useStyle = makeStyles({
//   root: {
//     cursor: "pointer",
//     textAlign: "center",
//     display: "flex",
//     "&:hover p,&:hover svg,& img": {
//       opacity: 1,
//     },
//     "& p, svg": {
//       opacity: 0.4,
//     },
//     "&:hover img": {
//       opacity: 0.3,
//     },
//   },
//   noMouseEvent: {
//     pointerEvents: "none",
//   },
//   iconText: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     alignItems: "center",
//     position: "absolute",
//   },
//   hidden: {
//     display: "none",
//   },
//   onDragOver: {
//     "& img": {
//       opacity: 0.3,
//     },
//     "& p, svg": {
//       opacity: 1,
//     },
//   },
// });

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  image: {
    url = "FileUploadDefaultImage",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const [imageUrl, setImageUrl] = React.useState(url);
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    if (imageButton && event && event?.target?.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    onChange(event);
  };

  return (
    <>
      <input
        required
        onChange={handleChange}
        accept={accept}
        style={{
          display: "none",
        }}
        id="file-upload"
        type="file"
      />

      <InputLabel
        htmlFor="file-upload"
        {...dragEvents}
        sx={{
          cursor: "pointer",
          textAlign: "center",
          display: "flex",
          "&:hover p,&:hover svg,& img": {
            opacity: 1,
          },
          "& p, svg": {
            opacity: 0.4,
          },
          "&:hover img": {
            opacity: 0.3,
          },
        }}
      >
        <Box
          width={width}
          height={height}
          bgcolor={backgroundColor}
          sx={{
            pointerEvents: "none",
          }}
        >
          {imageButton && (
            <Box position="absolute" height={height} width={width}>
              <img alt="file upload" src={imageUrl} style={imageStyle} />
            </Box>
          )}

          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box
                height={height}
                width={width}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                <CloudUpload fontSize="large" />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </InputLabel>
    </>
  );
};
