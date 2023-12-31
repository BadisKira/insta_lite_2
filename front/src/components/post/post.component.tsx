import { IPost } from "../../types/post.type"
import * as React from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Box, Collapse, Grid, Modal, useMediaQuery, useTheme } from "@mui/material"
import NotesIcon from "@mui/icons-material/Notes"
import CommentSection from "../comment/commentSection.component"
import { useMutation } from "@tanstack/react-query"
import { IUser } from "../../types/user.type"
import PostUpdateComponent from "./post.update.component"
import useAxiosPrivate from "../../hooks/useAxios"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"

const WIDTH_COMPONENT = 500
const WIDTH_EXPAND_COMMENT = 850

const WIDTH_CARD = 500
const WIDTH_COMMENT = 350

const HEIGHT_COMPONENT = 600
const HEIGHT_CARD = HEIGHT_COMPONENT
const HEIGHT_COMMENT_WHEN_EXPAND = 400

const HEIGHT_COMPONENT_EXPAND = HEIGHT_CARD + HEIGHT_COMMENT_WHEN_EXPAND

const Post: React.FC<IPost> = ({
	title,
	description,
	id,
	userFirstname,
	createdAt,
	likedUserIds,
	isPublic,
	userId,
	userLastname,
	commentsNumber,
}) => {
	const [commentSectionOpen, setCommentSectionOpen] = React.useState<boolean>(false)

	const postRef = React.useRef()

	const openCommentSection = () => {
		setCommentSectionOpen(true)
	}

	const theme = useTheme()
	const pageIsSmall = useMediaQuery(theme.breakpoints.down("md"))

	const instaliteApi = useAxiosPrivate()

	const likeMutation = useMutation({
		mutationKey: ["like", id],
		mutationFn: async () => {
			const token = localStorage.getItem("token")
			if (!token) return
			const response = await instaliteApi.put(
				`/posts/${id}/like`,
				{},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
			return response.data
		},
	})

	/***Gérer l'update */
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	/** *****/
	const handleDownloadImage = () => {
		const imageUrl = `http://localhost:8080/api/resource/${id}`

		const link = document.createElement("a")
		link.href = imageUrl
		link.download = "image"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<Box
			ref={postRef}
			sx={{
				position: "relative",
				display: "flex",
				flexDirection: pageIsSmall ? "column" : "row",
				marginX: "auto",
				marginTop: 1 / 2,
				width: {
					xs: "90vw",
					sm: "80vw",
					md: commentSectionOpen ? WIDTH_EXPAND_COMMENT : WIDTH_COMPONENT,
				},

				height: {
					xs: commentSectionOpen ? HEIGHT_COMPONENT_EXPAND : HEIGHT_COMPONENT,
					md: HEIGHT_COMPONENT,
				},
				// transitionDuration: "200ms",
				// transition: "ease-in-out",
			}}>
			<Card
				sx={{
					width: {
						xs: "90%",
						md: WIDTH_CARD,
					},
					height: HEIGHT_COMPONENT,

					display: "flex",
					flexDirection: "column",
				}}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							{userFirstname.charAt(0).toUpperCase()}
						</Avatar>
					}
					action={
						<Grid container justifyContent="space-between" alignItems="center" style={{ gap: 6 }}>
							<IconButton onClick={handleDownloadImage}>
								<FileDownloadOutlinedIcon />
							</IconButton>
							<PostUpdateComponent
								anchorEl={anchorEl}
								handleClick={handleClick}
								handleClose={handleClose}
								open={open}
								// page={page ? page : 0}
								// indexInPage={indexInPage ? indexInPage : 0}
								post={{
									title,
									description,
									id,
									userFirstname,
									createdAt,
									likedUserIds,
									isPublic,
									userId,
									userLastname,
									commentsNumber,
								}}
							/>
						</Grid>
					}
					title={title}
					subheader={createdAt}
				/>
				<CardMedia
					sx={{
						width: "100%",
						height: 425,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						background: "black",
						cursor: "pointer",
					}}>
					<ImageWithSize title={title} id={id} />
				</CardMedia>

				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{description} {isPublic ? "public" : "private"}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						position: "absolute",
						bottom: 0,
						right: {
							xs: "3%",
							sm: "5%",
							md: "-40px",
						},
						width: { xs: "15px", md: "20px" },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<LikeButton likeMutation={likeMutation} likes={likedUserIds} />

					<IconButton
						sx={{
							display: !commentSectionOpen ? "block" : "none",
						}}
						onClick={openCommentSection}>
						<NotesIcon sx={{ fontSize: 28 }} />
					</IconButton>
				</CardActions>
			</Card>

			<Collapse
				orientation={pageIsSmall ? "vertical" : "horizontal"}
				in={commentSectionOpen}
				mountOnEnter
				unmountOnExit
				onAnimationEnd={() => {}}>
				<Box
					height={{
						xs: HEIGHT_COMMENT_WHEN_EXPAND,
						md: HEIGHT_COMPONENT,
					}}
					width={{ xs: "90%", md: WIDTH_COMMENT }}>
					<CommentSection postId={id} setCommentSectionOpen={setCommentSectionOpen} />
				</Box>
			</Collapse>
		</Box>
	)
}
export default Post

const LikeButton = ({ likes, likeMutation }: { likes: number[]; likeMutation: any }) => {
	const { mutateAsync, data, isLoading, isError, isSuccess } = likeMutation

	const userString = localStorage.getItem("user")
	if (!userString) return

	const user = JSON.parse(userString) as IUser

	const isThePostLiked = () => {
		if (data && data.likedUserIds) {
			return data.likedUserIds.includes(user.id)
		} else {
			return likes.includes(user.id)
		}
	}

	return (
		<>
			<IconButton onClick={async () => await mutateAsync()}>
				{isThePostLiked() ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
			</IconButton>
			<Typography fontSize={8} component={"p"}>
				{data && data.likedUserIds && isSuccess ? data.likedUserIds.length : likes.length}
				{isLoading && "loading..."}
				{isError && "error..."}
			</Typography>
		</>
	)
}

const ImageWithSize = ({ id, title }: { id: string; title: string }) => {
	const imageUrl = `http://localhost:8080/api/resource/${id}`
	const [imageSize, setImageSize] = React.useState<any>({
		w: 0,
		h: 0,
	})
	const [modalOpen, setModalOpen] = React.useState(false)
	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	React.useLayoutEffect(() => {
		const img = new Image()

		img.onload = function () {
			const imageWidth = img.width
			const imageHeight = img.height

			setImageSize({ w: imageWidth, h: imageHeight })
		}

		img.src = imageUrl

		return () => {}
	}, [imageUrl])

	return (
		<>
			<img
				src={imageUrl}
				alt={title}
				onClick={openModal}
				style={{
					height: imageSize.w <= imageSize.h ? "100%" : "auto",
					width: imageSize.w > imageSize.h ? "100%" : "auto",
				}}
				onLoad={() =>
					console.log(`Largeur de l'image : ${imageSize.WIDTH_COMPONENT}px, Hauteur de l'image : ${imageSize.height}px`)
				}
			/>
			<Modal
				open={modalOpen}
				onClose={closeModal}
				sx={{
					maxWidth: "100%",
					maxHeight: "100%",
					display: "flex",
					justifyContent: "center",
					padding: "2.5%",
				}}>
				<img
					src={imageUrl}
					alt={title}
					style={{
						height: imageSize.w <= imageSize.h ? "100%" : "auto",
						width: imageSize.w > imageSize.h ? "100%" : "auto",
					}}
				/>
			</Modal>
		</>
	)
}
