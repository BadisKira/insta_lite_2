import { Grid, Typography } from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useQuery } from "@tanstack/react-query";
import {
  ICommentsDashboard,
  ILikesDashboard,
  IPostsDashboard,
  IUsersDashboard,
} from "../../types/dashboard.type";
import useAxiosPrivate from "../../hooks/useAxios";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const queryKeyDashboardPosts = "dashboard-posts";
const queryKeyDashboardLikes = "dashboard-likes";
const queryKeyDashboardComments = "dashboard-comments";
const queryKeyDashboardUsers = "dashboard-users";

const DashboardPage = () => {
  const instaliteApi = useAxiosPrivate();

  const { data: postsStats, isLoading: isLoadingPosts } = useQuery({
    queryKey: [queryKeyDashboardPosts],
    queryFn: async () => {
      const { data } = await instaliteApi.get<IPostsDashboard>(
        "/posts/dashboard"
      );
      return data;
    },
  });

  const { data: commentsStats, isLoading: isLoadingComments } = useQuery({
    queryKey: [queryKeyDashboardComments],
    queryFn: async () => {
      const { data } = await instaliteApi.get<ICommentsDashboard>(
        "/comments/dashboard"
      );
      return data;
    },
  });

  const { data: usersStats, isLoading: isLoadingUsers } = useQuery({
    queryKey: [queryKeyDashboardUsers],
    queryFn: async () => {
      const { data } = await instaliteApi.get<IUsersDashboard>(
        "/users/dashboard"
      );
      return data;
    },
  });

  const { data: likesStats, isLoading: isLoadingLikes } = useQuery({
    queryKey: [queryKeyDashboardLikes],
    queryFn: async () => {
      const { data } = await instaliteApi.get<ILikesDashboard>(
        "/posts/likes/dashboard"
      );
      return data;
    },
  });

  const calculatePercentage = (value: number, total: number) => {
    const percentage = ((value / total) * 100).toFixed(2);

    if (isNaN(Number(percentage))) {
      return 0.0;
    }

    return percentage;
  };

  return (
    <PageContainer withHeader={true}>
      <Grid container direction="row" style={{ padding: "50px 0px", gap: 30 }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        {!isLoadingUsers && usersStats && (
          <Grid
            container
            direction="column"
            style={{
              borderRadius: 12,
              padding: 16,
              gap: 8,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              style={{ gap: 8 }}
            >
              <GroupOutlinedIcon style={{ fill: "#488fec" }} />
              <Typography variant="h6" fontWeight="bold" color="#488fec">
                Utilisateurs
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ gap: 8, height: 300 }}
            >
              <DonutChartExample data={usersStats} />
            </Grid>
          </Grid>
        )}
        {!isLoadingPosts && postsStats && (
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Typography color="#488fec">Tout</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {postsStats.allPosts} posts
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Typography color="#488fec">Ce mois</Typography>
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ gap: 12 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {postsStats.monthPosts} posts
                  </Typography>
                  <Typography>
                    (
                    {calculatePercentage(
                      postsStats.monthPosts,
                      postsStats.allPosts
                    )}
                    %)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Typography color="#488fec">Cette semaine</Typography>
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ gap: 12 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {postsStats.weekPosts} posts
                  </Typography>
                  <Typography>
                    (
                    {calculatePercentage(
                      postsStats.weekPosts,
                      postsStats.allPosts
                    )}
                    %)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Typography color="#488fec">Aujourd'hui</Typography>
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ gap: 12 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {postsStats.todayPosts} posts
                  </Typography>
                  <Typography>
                    (
                    {calculatePercentage(
                      postsStats.todayPosts,
                      postsStats.allPosts
                    )}
                    %)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid container item xs={12} spacing={2}>
          {!isLoadingLikes && likesStats && (
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ gap: 8 }}
                >
                  <ThumbUpOutlinedIcon style={{ fill: "#488fec" }} />
                  <Typography variant="h6" fontWeight="bold" color="#488fec">
                    Likes
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ gap: 8 }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {likesStats.allLikes}
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Total de likes
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {likesStats.mostLikesPost}
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Post le plus liké
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {likesStats.countAverageLikes}
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Moyenne / post
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isLoadingComments && commentsStats && (
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="column"
                style={{
                  borderRadius: 12,
                  padding: 16,
                  gap: 8,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ gap: 8 }}
                >
                  <CommentOutlinedIcon style={{ fill: "#488fec" }} />
                  <Typography variant="h6" fontWeight="bold" color="#488fec">
                    Commentaires
                  </Typography>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ gap: 8 }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {commentsStats.allComments}
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Total de commentaires
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {commentsStats.mostCommentsPost}
                    </Typography>
                    <Typography style={{ textAlign: "center" }}>
                      Post le plus commenté
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                    style={{
                      gap: 6,
                      borderRadius: 8,
                      boxShadow: "rgba(180, 184, 189, 0.2) 0px 8px 24px",
                      padding: "26px",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {commentsStats.countAverageComments}
                    </Typography>
                    <Typography  style={{ textAlign: "center" }}>
                      Moyenne / post
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};
const DonutChartExample = ({ data }: { data: IUsersDashboard }) => {
  // Données du graphique
  const d = {
    labels: ["User", "SUPERUSER", "ADMIN"],
    datasets: [
      {
        data: [data.countUsers, data.countSuperUsers, data.countAdmins],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Doughnut data={d}  />;
};
export default DashboardPage;
