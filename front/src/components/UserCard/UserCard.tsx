import { Button, Grid, IconButton, Typography } from "@mui/material"
import { IUser } from "../../types/user.type"
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural"
import React from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import BasicMenu from "../BasicMenu/BasicMenu"
import { useNavigate } from "react-router-dom"
import { ProtectedComponent } from "../../router/ProtectedComponent"

interface IProps {
	user: IUser
	redirectionUrl: string
	handleDelete?: () => void
	handleUpdate?: () => void
}

const UserCard = ({ user, redirectionUrl, handleDelete, handleUpdate }: IProps) => {
	const navigate = useNavigate()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleMenuElementClick = (element: "Modifier" | "Supprimer") => {
		const operationDict = {
			Modifier: handleUpdate,
			Supprimer: handleDelete,
		}

		const operation = operationDict[element]

		if (operation) {
			operation()
		}
	}

	return (
		<Grid item xs={2} sm={4} md={4}>
			<Grid
				container
				style={{
					borderRadius: 12,
					padding: 30,
					gap: 30,
					boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
				}}>
				<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 20 }}>
					<FaceRetouchingNaturalIcon style={{ fill: "#5570e7", width: 40, height: 40 }} />
					<Grid style={{ flex: 1 }}>
						<Typography variant="h6" fontWeight="bold" style={{ width: "fit-content" }}>
							{user.firstname} {user.lastname}
						</Typography>
						<Typography style={{ opacity: 0.7, width: "fit-content" }}>{user.email}</Typography>
					</Grid>
					<ProtectedComponent allowedRoles={["ADMIN"]}>
						<Grid>
							<IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}>
								<MoreVertIcon />
							</IconButton>

							<BasicMenu
								anchorEl={anchorEl}
								menuElements={["Modifier", "Supprimer"]}
								open={open}
								handleMenuElementClick={handleMenuElementClick}
								handleClose={() => setAnchorEl(null)}
							/>
						</Grid>
					</ProtectedComponent>
				</Grid>
				<ProtectedComponent allowedRoles={["ADMIN"]}>
					<Typography variant="body2" style={{ padding: "4px 8px", backgroundColor: "#88a5f3", borderRadius: 8 }}>
						{user.role}
					</Typography>
				</ProtectedComponent>
				<Grid container>
					<Button variant="outlined" onClick={() => navigate(`/${redirectionUrl}/${user.id}`)}>
						Voir portfolio
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default UserCard
