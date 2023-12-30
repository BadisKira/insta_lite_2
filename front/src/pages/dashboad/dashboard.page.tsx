import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useQuery } from "@tanstack/react-query";
import instaliteApi from "../../utils/axios/axiosConnection";
import { ICommentsDashboard, ILikesDashboard, IPostsDashboard, IUsersDashboard } from "../../types/dashboard.type";
import { IPost } from "../../types/post.type";


const queryKeyDashboardPosts = "dashboard-posts";
const queryKeyDashboardLikes = "dashboard-likes";
const queryKeyDashboardComments = "dashboard-comments";
const queryKeyDashboardUsers = "dashboard-users";
const queryKeyDashboardMostLikedPost = "dashboard-liked-post";


const getDashBoardPosts = async () => {
    return await instaliteApi.get<IPostsDashboard>("/posts/dashboard");
};

const getDashBoardLikes = async () => {
  return await instaliteApi.get<ILikesDashboard>("/posts/likes/dashboard");
};

const getDashBoardComments = async () => {
  return await instaliteApi.get<ICommentsDashboard>("/comments/dashboard");
};

const getDashBoardUsers= async () => {
  return await instaliteApi.get<IUsersDashboard>("/users/dashboard");
};


const getDashBoardMostLikedPost = async () => {
    return await instaliteApi.get<IPost>("/posts/mostLiked");
};





const DashboardPage = () => {

    
    const { data: dashboardPosts , isLoading:isLoadingPosts } = useQuery({
        queryKey: [queryKeyDashboardPosts],
        queryFn: getDashBoardPosts
    });

      const { data: dashboardComment, isLoading: isLoadingComments } = useQuery({
        queryKey: [queryKeyDashboardComments],
        queryFn: getDashBoardComments,
      });

    
      const { data: dashboardUsers, isLoading: isLoadingUsers } = useQuery({
        queryKey: [queryKeyDashboardUsers],
        queryFn: getDashBoardUsers,
      });

    
      const { data: dashboardLikes, isLoading: isLoadingLikes } = useQuery({
        queryKey: [queryKeyDashboardLikes],
        queryFn: getDashBoardLikes,
      });

      const { data: mostLikedPost, isLoading: isLoadingMostLikedPost } = useQuery({
        queryKey: [queryKeyDashboardMostLikedPost],
        queryFn: getDashBoardMostLikedPost,
      });


    
  return (
    <PageContainer withHeader={true}>
      <Typography variant="h4" my={1}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Première ligne */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {/* Colonne 1 */}
            <div style={{ backgroundColor: "lightgray", height: "100px" }}>
              Colonne 1
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Colonne 2 */}
            <div style={{ backgroundColor: "lightgray", height: "100px" }}>
              Colonne 2
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Colonne 3 */}
            <div style={{ backgroundColor: "lightgray", height: "100px" }}>
              Colonne 3
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Colonne 4 */}
            <div style={{ backgroundColor: "lightgray", height: "100px" }}>
              Colonne 4
            </div>
          </Grid>
        </Grid>
        {/* Deuxième ligne */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={6}>
            {/* Colonne 1 - Deux étages */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ backgroundColor: "lightgray", height: "150px" }}>
                  Étage 1
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{ backgroundColor: "lightgray", height: "150px" }}>
                  Étage 2
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Colonne 2 - Long texte */}
            <div
              style={{
                backgroundColor: "lightgray",
                // height: "300px",
                // overflow: "auto",
              }}
            >
              {/* <Post
                title="naruto"
                description={"Je suis Naruto"}
                commentsNumber={12}
                id="59d7b0bd-dca5-4cd1-9176-6686c6718e1d"
                createdAt="10-12-2023"
                isPublic={true}
                likedUserIds={[]}
                userFirstname="Badis dix"
                userId={5}
                userLastname="Hamm"
              /> */}
            </div>
          </Grid>
        </Grid>
        {/* Troisième ligne */}
        <Grid container item xs={12} justifyContent="center">
          {/* Élément centré */}
          <div
            style={{
              backgroundColor: "lightgray",
              height: "100px",
              width: "100px",
            }}
          >
            Centré
          </div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardPage;

function CardInvertedColors() {
  return (
    <>
      <Card variant="outlined" sx={{ bgcolor: "primary.main", color: "white" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={60}
            thickness={2}
            variant="determinate"
            value={20}
            color="secondary"
            sx={{ mr: { xs: 2, md: 0 } }}
          />
          <div>
            <Typography variant="body1">Gross profit</Typography>
            <Typography variant="h4" sx={{ color: "white" }}>
              $ 432.6M
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            sx={{ color: "white", border: "1px solid white", mr: 1 }}
          >
            Add to Watchlist
          </Button>
          <Button variant="contained" size="small">
            See breakdown
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
