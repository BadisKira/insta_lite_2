import { Grid } from "@mui/material"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import { LoaderIcon } from "react-hot-toast"
import { FC } from "react"
import AppHeader from "../AppHeader/AppHeader"

interface IProps {
	withHeader: boolean
	children: React.ReactNode
}

const PageContainer: FC<IProps> = ({ withHeader, children }) => {
	const { isLoading } = useAuthContext()

	return (
		<>
			<Grid container justifyContent="center" style={{ overflowX: "hidden" }}>
				{withHeader && <AppHeader />}

				{isLoading ? (
					<Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
						<LoaderIcon style={{ width: 40, height: 40 }} />
					</Grid>
				) : (
					<Grid item flex={1} container xs={10} lg={8}>
						{children}
					</Grid>
				)}
			</Grid>
		</>
	)
}

export default PageContainer
