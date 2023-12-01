import { ClipLoader, PulseLoader } from "react-spinners";

type LoaderProps = {
  color?: "red" | "green" | "blue";
  loading?: boolean;
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ color="blue", loading = true, size = 10 }) => {
  return (
    <PulseLoader
      color={color}
      loading={loading}
      size={size}
      speedMultiplier={0.8}
    />
  );
};

export default Loader;
