import { useLayoutEffect, useState } from "react"
import PageContainer from "../../components/PageContainer/PageContainer"
import FeedPageSection, {
	IVisibilityPosteType,
	SelectVisibilityPostType,
} from "../../pageSections/feed/feed.pageSection"
import { IPost } from "../../types/post.type"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import useAxiosPrivate from "../../hooks/useAxios"
import { ProtectedComponent } from "../../router/ProtectedComponent"
import { Grid } from "@mui/material"

/***
 *
 * Ce que je veux faire c'est mettre en place un placeholder po
 */
const FeedPage = () => {
	/**User authentification */
	const instaliteApi = useAxiosPrivate()
	const { user } = useAuthContext()
	const v = localStorage.getItem("visibilitypost")
	const [visibilityTypePost, setVisibilityTypePost] = useState<IVisibilityPosteType>(
		v && user && user.role !== "USER" ? (v as IVisibilityPosteType) : "public"
	)

	useLayoutEffect(() => {
		setVisibilityTypePost(v && user && user.role !== "USER" ? (v as IVisibilityPosteType) : "public")
	}, [user])

	const getPostsFn = async (page: number) => {
		const response = await instaliteApi.get<IPost[]>(`posts/${visibilityTypePost}?pageNumber=${page - 1}&pageLimit=2`)
		return response.data
	}

	return (
		<PageContainer withHeader={true}>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				style={{ padding: "25px 0px", gap: 30 }}>
				<ProtectedComponent allowedRoles={["ADMIN", "SUPERUSER"]}>
					<SelectVisibilityPostType
						visibilityTypePost={visibilityTypePost}
						setVisibilityTypePost={setVisibilityTypePost}
					/>
				</ProtectedComponent>
				<FeedPageSection
					getFn={getPostsFn}
					queryKey="feedposts"
					visibilityTypePost={visibilityTypePost}
					setVisibilityTypePost={setVisibilityTypePost}
				/>
			</Grid>
		</PageContainer>
	)
}

export default FeedPage
