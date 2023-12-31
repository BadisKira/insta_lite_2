import { Grid } from "@mui/material"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import { IPost } from "../../types/post.type"
import FeedPageSection, { IVisibilityPosteType } from "../../pageSections/feed/feed.pageSection"
import { useState } from "react"
import { SelectVisibilityPostType } from "../../pageSections/feed/feed.pageSection"
import useAxiosPrivate from "../../hooks/useAxios"
import { ProtectedComponent } from "../../router/ProtectedComponent"

const UserPortfolioSectionPage = ({ userId }: { userId: number }) => {
	const instaliteApi = useAxiosPrivate()
	const { user } = useAuthContext()
	const v = localStorage.getItem("visibilitypost")
	const [visibilityTypePost, setVisibilityTypePost] = useState<IVisibilityPosteType>(
		v && user && user.role !== "USER" ? (v as IVisibilityPosteType) : "public"
	)

	const getPostsForOneUser = async (page: number) => {
		const { data } = await instaliteApi.get<IPost[]>(
			`posts/user/${userId}?pageNumber=${page - 1}&pageLimit=2&visibilityType=${visibilityTypePost}`
		)
		return data
	}

	return (
		<Grid container>
			<ProtectedComponent allowedRoles={["ADMIN", "SUPERUSER"]}>
				<SelectVisibilityPostType
					visibilityTypePost={visibilityTypePost}
					setVisibilityTypePost={setVisibilityTypePost}
				/>
			</ProtectedComponent>
			<FeedPageSection
				getFn={getPostsForOneUser}
				queryKey="userAllPosts"
				visibilityTypePost={visibilityTypePost}
				setVisibilityTypePost={setVisibilityTypePost}
			/>
		</Grid>
	)
}

export default UserPortfolioSectionPage
