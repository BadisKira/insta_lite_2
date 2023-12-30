import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importer l'icône de retour

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/"); // Rediriger vers la page d'accueil ou une autre page spécifique
  };

  return (
    <PageContainer withHeader={false}>
      <Typography variant="h3" color="hotpink">
        Page introuvable
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />} // Utiliser l'icône de retour
        onClick={handleNavigate}
      >
        Retour à l'accueil
      </Button>
    </PageContainer>
  );
};

export default NotFoundPage;
