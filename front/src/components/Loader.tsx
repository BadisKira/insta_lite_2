import {  PacmanLoader } from "react-spinners";
import { Box } from "@mui/material";
type LoaderProps = {
  color?: "red" | "green" | "blue";
  loading?: boolean;
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ color="blue", loading = true, size = 10 }) => {
  return (
    <PacmanLoader
      color={color}
      loading={loading}
      size={size}
      speedMultiplier={0.8}
    />
  );
};



export const LoaderFullScreen = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader size={120} color="#7845bc" speedMultiplier={2.8} loading={true} />
    </Box>
  );
};



export default Loader;
