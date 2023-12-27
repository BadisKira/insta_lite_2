import { useRoutes } from "react-router-dom";
import routes from "./router";


const App = () => {
  const applicationContent = useRoutes(routes);

  return (
    <>
     {applicationContent}
    </>
  );
};

export default App
