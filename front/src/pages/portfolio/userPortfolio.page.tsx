import { Grid, Typography } from "@mui/material"
import PageContainer from "../../components/PageContainer/PageContainer"
import { useParams } from "react-router-dom"
import CreatePost from "../../components/post/createPost.component"
import UserPortfolioSectionPage from "../../pageSections/portfolio/userPortfolio.pageSection"

import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../hooks/useAxios"
import { IUser } from "../../types/user.type"
import { ProtectedComponent } from "../../router/ProtectedComponent"

const UserPortfolioPage = () => {
	const { userId } = useParams()

	const instaliteApi = useAxios()

	const { data: user } = useQuery({
		queryKey: ["getOneUser"],
		queryFn: async () => {
			const { data } = await instaliteApi.get<IUser>(`users/${userId}`)
			return data
		},
	})

	return (
		<PageContainer withHeader={true}>
			<Grid container style={{ padding: "25px 0px" }}>
				<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 20 }}>
					{user && (
						<>
							<FaceRetouchingNaturalIcon style={{ fill: "#5570e7", width: 40, height: 40 }} />
							<Grid style={{ flex: 1 }}>
								<Typography variant="h6" fontWeight="bold" style={{ width: "fit-content" }}>
									{user.firstname} {user.lastname}
								</Typography>
								<Typography style={{ opacity: 0.7, width: "fit-content" }}>{user.email}</Typography>
							</Grid>
						</>
					)}
				</Grid>
			</Grid>

			<ProtectedComponent allowedRoles={["ADMIN"]}>
				<>{userId && <CreatePost userId={parseInt(userId)} />}</>
			</ProtectedComponent>
			{userId && <UserPortfolioSectionPage userId={parseInt(userId)} />}
		</PageContainer>
	)
}

export default UserPortfolioPage
