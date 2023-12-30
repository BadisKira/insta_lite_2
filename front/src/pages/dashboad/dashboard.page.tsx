import { Button, Card, CardActions, CardContent, Grid, Typography, CircularProgress } from "@mui/material"
import PageContainer from "../../components/PageContainer/PageContainer"
import { useQuery } from "@tanstack/react-query"
import { ICommentsDashboard, ILikesDashboard, IPostsDashboard, IUsersDashboard } from "../../types/dashboard.type"
import { IPost } from "../../types/post.type"
import useAxiosPrivate from "../../hooks/useAxios"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"

const queryKeyDashboardPosts = "dashboard-posts"
const queryKeyDashboardLikes = "dashboard-likes"
const queryKeyDashboardComments = "dashboard-comments"
const queryKeyDashboardUsers = "dashboard-users"
const queryKeyDashboardMostLikedPost = "dashboard-liked-post"

const DashboardPage = () => {
	const instaliteApi = useAxiosPrivate()
	const getDashBoardPosts = async () => {
		return await instaliteApi.get<IPostsDashboard>("/posts/dashboard")
	}

	const getDashBoardLikes = async () => {
		return await instaliteApi.get<ILikesDashboard>("/posts/likes/dashboard")
	}

	const getDashBoardComments = async () => {
		return await instaliteApi.get<ICommentsDashboard>("/comments/dashboard")
	}

	const getDashBoardUsers = async () => {
		return await instaliteApi.get<IUsersDashboard>("/users/dashboard")
	}

	const getDashBoardMostLikedPost = async () => {
		return await instaliteApi.get<IPost>("/posts/mostLiked")
	}

	const { data: dashboardPosts, isLoading: isLoadingPosts } = useQuery({
		queryKey: [queryKeyDashboardPosts],
		queryFn: getDashBoardPosts,
	})

	const { data: dashboardComment, isLoading: isLoadingComments } = useQuery({
		queryKey: [queryKeyDashboardComments],
		queryFn: getDashBoardComments,
	})

	const { data: dashboardUsers, isLoading: isLoadingUsers } = useQuery({
		queryKey: [queryKeyDashboardUsers],
		queryFn: getDashBoardUsers,
	})

	const { data: dashboardLikes, isLoading: isLoadingLikes } = useQuery({
		queryKey: [queryKeyDashboardLikes],
		queryFn: getDashBoardLikes,
	})

	const { data: mostLikedPost, isLoading: isLoadingMostLikedPost } = useQuery({
		queryKey: [queryKeyDashboardMostLikedPost],
		queryFn: getDashBoardMostLikedPost,
	})

	const usersStats: IUsersDashboard = {
		countAdmins: 3,
		countUsers: 42,
		countSuperUsers: 12,
	}

	const postsStats: IPostsDashboard = {
		weekPosts: 12,
		monthPosts: 45,
		todayPosts: 3,
		allPosts: 541,
	}

	const likesStats: ILikesDashboard = {
		mostLikesPost: 142,
		countAverageLikes: 58,
		allLikes: 12457,
	}

	const commentsStats: ICommentsDashboard = {
		mostCommentsPost: 58,
		countAverageComments: 8,
		allComments: 4578,
	}

	const calculatePercentage = (value: number, total: number) => {
		return ((value / total) * 100).toFixed(2)
	}

	return (
		<PageContainer withHeader={true}>
			<Grid container direction="row" style={{ padding: "25px 0px", gap: 30 }}>
				<Typography variant="h4">Dashboard</Typography>
				<Grid container item xs={12} justifyContent="center">
					<Grid
						container
						direction="column"
						style={{
							borderRadius: 12,
							padding: 16,
							gap: 8,
							boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
						}}>
						countAdmins: 3, countUsers: 42, countSuperUsers: 12,
					</Grid>
				</Grid>
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
							}}>
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
							}}>
							<Typography color="#488fec">Ce mois</Typography>
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 12 }}>
								<Typography variant="h6" fontWeight="bold">
									{postsStats.monthPosts} posts
								</Typography>
								<Typography>({calculatePercentage(postsStats.monthPosts, postsStats.allPosts)}%)</Typography>
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
							}}>
							<Typography color="#488fec">Cette semaine</Typography>
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 12 }}>
								<Typography variant="h6" fontWeight="bold">
									{postsStats.weekPosts} posts
								</Typography>
								<Typography>({calculatePercentage(postsStats.weekPosts, postsStats.allPosts)}%)</Typography>
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
							}}>
							<Typography color="#488fec">Aujourd'hui</Typography>
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 12 }}>
								<Typography variant="h6" fontWeight="bold">
									{postsStats.todayPosts} posts
								</Typography>
								<Typography>({calculatePercentage(postsStats.todayPosts, postsStats.allPosts)}%)</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container item xs={12} spacing={2}>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							style={{
								borderRadius: 12,
								padding: 16,
								gap: 8,
								boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
							}}>
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 8 }}>
								<ThumbUpOutlinedIcon style={{ fill: "#488fec" }} />
								<Typography variant="h6" fontWeight="bold" color="#488fec">
									Likes
								</Typography>
							</Grid>
							<Grid container justifyContent="center" alignItems="center" style={{ gap: 8 }}>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{likesStats.allLikes}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Total de likes</Typography>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{likesStats.mostLikesPost}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Post le plus liké</Typography>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{likesStats.countAverageLikes}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Moyenne / post</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							style={{
								borderRadius: 12,
								padding: 16,
								gap: 8,
								boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
							}}>
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 8 }}>
								<CommentOutlinedIcon style={{ fill: "#488fec" }} />
								<Typography variant="h6" fontWeight="bold" color="#488fec">
									Commentaires
								</Typography>
							</Grid>
							<Grid container justifyContent="center" alignItems="center" style={{ gap: 8 }}>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{commentsStats.allComments}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Total de commentaires</Typography>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{commentsStats.mostCommentsPost}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Post le plus commenté</Typography>
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
									}}>
									<Typography variant="h6" fontWeight="bold">
										{commentsStats.countAverageComments}
									</Typography>
									<Typography style={{ textAlign: "center" }}>Moyenne / post</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default DashboardPage

function CardInvertedColors() {
	return (
		<>
			<Card variant="outlined" sx={{ bgcolor: "primary.main", color: "white" }}>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: "center",
					}}>
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
					<Button variant="outlined" size="small" sx={{ color: "white", border: "1px solid white", mr: 1 }}>
						Add to Watchlist
					</Button>
					<Button variant="contained" size="small">
						See breakdown
					</Button>
				</CardActions>
			</Card>
		</>
	)
}
