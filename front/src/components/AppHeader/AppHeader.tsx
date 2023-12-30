import { FC } from "react"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import { headerRoutes, headerRoutesAdmin, headerRoutesAuthenticatedUsers } from "../../router"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import {
	Grid,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
	useTheme,
	Button,
	Stack,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
interface IProps {}

const HeaderContent = ({ isMobile }: { isMobile: boolean }) => {
	const { user, isAuthenticated } = useAuthContext()
	const navigate = useNavigate()

	return (
		<>
			{headerRoutes.length > 0 &&
				headerRoutes.map((h) => (
					<Link
						to={h.path}
						style={{
							margin: isMobile ? "10px 0px" : "0px",
						}}
						key={h.path}>
						<Typography style={{ opacity: "0.7" }}>{h.elementName}</Typography>
					</Link>
				))}
			{user?.role === "ADMIN" && (
				<>
					{headerRoutesAdmin.length > 0 &&
						headerRoutesAdmin.map((h) => (
							<Link to={h.path} style={{ margin: isMobile ? "10px 0px" : "0px" }} key={h.path}>
								<Typography style={{ opacity: "0.7" }}>{h.elementName}</Typography>
							</Link>
						))}
				</>
			)}

			{user && isAuthenticated ? (
				<Grid
					flex={1}
					container
					justifyContent="flex-end"
					sx={{
						margin: isMobile ? "50px 0px" : "0px",
					}}>
					<>
						{headerRoutesAuthenticatedUsers.map((h) => (
							<Link
								to={h.path}
								style={{
									textDecoration: "none",
									color: "white",
									width: "100%",
								}}
								key={h.path}>
								<Grid
									container
									display={"flex"}
									width={"100%"}
									justifyContent="center"
									alignItems="center"
									flexDirection={"column"}
									style={{ rowGap: 4 }}>
									<AccountCircleOutlinedIcon style={{ width: 30, height: 30 }} />
									<Typography>
										{user?.firstname} {user?.lastname}
									</Typography>
								</Grid>
							</Link>
						))}
					</>
				</Grid>
			) : (
				<Button
					sx={{
						background: "white",
						color: "black",
						width: 200,
						"&:hover": {
							color: "white",
						},
						boxShadow:
							" rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
					}}
					onClick={() => navigate("/auth")}>
					{" "}
					Login{" "}
				</Button>
			)}
		</>
	)
}
// export default AppHeader;

const AppHeader = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	const [drawerOpen, setDrawerOpen] = useState(false)

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen)
	}

	const renderDrawer = (
		<Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} sx={{}}>
			<Box
				sx={{
					background: "#363232",
					height: "100%",
					width: 250,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					paddingTop: "50px",
				}}>
				<HeaderContent isMobile={isMobile} />
			</Box>
		</Drawer>
	)

	return (
		<React.Fragment>
			<AppBar position="static" style={{ height: 60, backgroundColor: " #363232" }}>
				<Toolbar
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "space-around",
						padding: 0,
						margin: 0,
					}}>
					<Grid sx={{}}>
						<Link to="/">
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								InstaLite II
							</Typography>
						</Link>
					</Grid>
					{isMobile ? (
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
					) : (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							{/**DEBUT DE HEADER */}
							<Grid
								flex={2}
								container
								justifyContent="center"
								alignItems="center"
								width="fit-content"
								color="white"
								style={{ gap: 32 }}>
								<HeaderContent isMobile={isMobile} />
							</Grid>
						</Box>
					)}
				</Toolbar>
			</AppBar>
			{isMobile && renderDrawer}
		</React.Fragment>
	)
}

export default AppHeader
