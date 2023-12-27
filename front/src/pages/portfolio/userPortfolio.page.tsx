import { CircularProgress, Grid } from "@mui/material"
import PageContainer from "../../components/PageContainer/PageContainer"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import instaliteApi from "../../utils/axios/axiosConnection"
import { IPost } from "../../types/post.type"
import { useQuery } from "@tanstack/react-query"
import Post from "../../components/post/post.component"
import CreatePost from "../../components/post/createPost.component"

const UserPortfolioPage = () => {
	const { token } = useAuthContext()
	const { userId } = useParams()

	const { data: posts, isLoading } = useQuery({
		queryKey: ["getAllUserPosts"],
		queryFn: async () => {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			const { data } = await instaliteApi.get<IPost[]>(`posts/user/${userId}`)
			return data
		},
	})

	return (
		<PageContainer withHeader={true}>
			<Grid container style={{ padding: "50px 0px" }}>
				<Grid>User ID : {userId}</Grid>

				<CreatePost />

				<Grid container>
					{isLoading ? <CircularProgress /> : <>{posts && posts.map((post) => <Post {...post} key={post.id} />)}</>}
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default UserPortfolioPage
