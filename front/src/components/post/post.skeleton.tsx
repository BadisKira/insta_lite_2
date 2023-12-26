import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";



// const WIDTH_COMPONENT = 500;
// const WIDTH_EXPAND_COMMENT = 850;

// const WIDTH_CARD = 500;
// const WIDTH_COMMENT = 350;

// const HEIGHT_COMPONENT = 600;
// const HEIGHT_CARD = HEIGHT_COMPONENT;
// const HEIGHT_COMMENT_WHEN_EXPAND = 400;


const PostSkeleton = () => {
   return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={400} height={60} />
      <Skeleton variant="rounded" width={400} height={60} />
    </Stack>
  );
};

export default PostSkeleton;
