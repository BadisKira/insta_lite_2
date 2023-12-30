import { Grid, Typography } from "@mui/material"
import PageContainer from "../../components/PageContainer/PageContainer"
import { useQuery } from "@tanstack/react-query"
import { ICommentsDashboard, ILikesDashboard, IPostsDashboard, IUsersDashboard } from "../../types/dashboard.type"
// import { IPost } from "../../types/post.type"
import useAxiosPrivate from "../../hooks/useAxios"
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"

const queryKeyDashboardPosts = "dashboard-posts"
const queryKeyDashboardLikes = "dashboard-likes"
const queryKeyDashboardComments = "dashboard-comments"
const queryKeyDashboardUsers = "dashboard-users"
// const queryKeyDashboardMostLikedPost = "dashboard-liked-post"

import { Chart } from "chartjs"

const DashboardPage = () => {
	const instaliteApi = useAxiosPrivate()

	const { data: postsStats, isLoading: isLoadingPosts } = useQuery({
		queryKey: [queryKeyDashboardPosts],
		queryFn: async () => {
			const { data } = await instaliteApi.get<IPostsDashboard>("/posts/dashboard")
			return data
		},
	})

	const { data: commentsStats, isLoading: isLoadingComments } = useQuery({
		queryKey: [queryKeyDashboardComments],
		queryFn: async () => {
			const { data } = await instaliteApi.get<ICommentsDashboard>("/comments/dashboard")
			return data
		},
	})

	const { data: usersStats, isLoading: isLoadingUsers } = useQuery({
		queryKey: [queryKeyDashboardUsers],
		queryFn: async () => {
			const { data } = await instaliteApi.get<IUsersDashboard>("/users/dashboard")
			return data
		},
	})

	const { data: likesStats, isLoading: isLoadingLikes } = useQuery({
		queryKey: [queryKeyDashboardLikes],
		queryFn: async () => {
			const { data } = await instaliteApi.get<ILikesDashboard>("/posts/likes/dashboard")
			return data
		},
	})

	// const { data: mostLikedPost, isLoading: isLoadingMostLikedPost } = useQuery({
	// 	queryKey: [queryKeyDashboardMostLikedPost],
	// 	queryFn: async () => {
	// 	const { data } = await instaliteApi.get<IPost>("/posts/mostLiked")
	// 	return data
	// }
	// })

	const calculatePercentage = (value: number, total: number) => {
		const percentage = ((value / total) * 100).toFixed(2)

		if (isNaN(Number(percentage))) {
			return 0.0
		}

		return percentage
	}

	const data = {
		labels: ["Administrateurs", "Super-Utilisateurs", "Utilisateurs normaux"],
		datasets: [
			{
				label: "Nombre d'administrateurs",
				data: usersStats && usersStats.countAdmins,
				backgroundColor: "#ffa9a9",
			},
			{
				label: "Nombre de super-utilisateurs",
				data: usersStats && usersStats.countSuperUsers,
				backgroundColor: "#4deb3e",
			},
			{
				label: "Nombre d'utilisateurs normaux",
				data: usersStats && usersStats.countUsers,
				backgroundColor: "#90b9e7",
			},
		],
	}

	const config = {
		type: "doughnut",
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: "top",
				},
				title: {
					display: true,
					text: "Chart.js Doughnut Chart",
				},
			},
		},
	}

	return (
		<PageContainer withHeader={true}>
			<Grid container direction="row" style={{ padding: "50px 0px", gap: 30 }}>
				<Typography variant="h4" fontWeight="bold">
					Dashboard
				</Typography>
				{!isLoadingUsers && usersStats && (
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
							<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 8 }}>
								<GroupOutlinedIcon style={{ fill: "#488fec" }} />
								<Typography variant="h6" fontWeight="bold" color="#488fec">
									Utilisateurs
								</Typography>
							</Grid>
							<Chart data={config} />
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
					)}
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default DashboardPage
