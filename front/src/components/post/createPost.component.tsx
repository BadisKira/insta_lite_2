import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ICreatePost } from "../../types/post.type"
import { Button, Chip, Grid, Paper, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { Done } from "@mui/icons-material"
import Loader from "../Loader"
import useAxiosPrivate from "../../hooks/useAxios"

const EMPTYPOST: ICreatePost = {
	data: null,
	isPublic: true,
	description: "",
	postType: "IMAGE",
	title: "",
	userId: 0,
}

const CreatePost = ({ userId }: { userId: number }) => {
	const [postInfo, setPostInfo] = useState<ICreatePost | undefined>(undefined)
	const queryPost = useQueryClient()

	const instaliteApi = useAxiosPrivate()

	const createPostFn = async (post: ICreatePost) => {
		const postFormData = new FormData()

		postFormData.append("title", post.title)
		postFormData.append("description", post.description)
		postFormData.append("isPublic", post.isPublic ? "true" : "false")

		if (post.data) postFormData.append("data", post.data)
		postFormData.append("postType", "IMAGE")
		postFormData.append("userId", String(post.userId))

		const response = await instaliteApi.postForm(`posts`, postFormData, {})
		return await response.data
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		//@ts-ignore
		setPostInfo((prev) => {
			if (e.target.name && e.target.value) return { ...prev, [e.target.name]: e.target.value }
		})
	}
	const { mutateAsync: createPostMutate, isPending } = useMutation({
		mutationKey: ["feedposts"],
		mutationFn: async (post: ICreatePost) => await createPostFn(post),
		onError: () => {
			// faire un toast
		},
		onSuccess: () => {
			// faire un toast
			queryPost.invalidateQueries({
				queryKey: ["userAllPosts"],
			})
			setPostInfo(EMPTYPOST)
		},
	})

	return (
		<Grid
			container
			style={{
				padding: 30,
				marginTop: 3,
				borderRadius: 12,
				gap: 30,
				backgroundColor: "white",
				boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
			}}>
			<form
				onSubmit={async (e) => {
					e.preventDefault()
					if (postInfo) {
						await createPostMutate({ ...postInfo, userId })
					}
				}}>
				<Grid container direction="column" gap={1}>
					<Grid item container direction="column" spacing={1}>
						<Grid item xs={12} sm={4}>
							<TextField
								fullWidth
								size="small"
								variant="outlined"
								value={postInfo?.title}
								label="Titre"
								name="title"
								required
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								value={postInfo?.description}
								label="Description"
								name="description"
								multiline
								fullWidth
								rows={1}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={6} sm={4}>
							<input
								type="file"
								accept={"image/*"}
								required
								name="data"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									if (postInfo)
										setPostInfo({
											...postInfo,
											data: e.target.files ? e.target.files[0] : null,
										})
								}}
							/>
						</Grid>

						<Grid
							item
							xs={6}
							sm={4}
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<CustomCheckBoxChip value={postInfo?.isPublic} setValue={setPostInfo} name="isPublic" />
						</Grid>
					</Grid>
				</Grid>

				<Button
					type="submit"
					variant="outlined"
					sx={{
						width: "150px",
						height: "40px",
						marginY: "10px",
					}}>
					{isPending ? <Loader /> : "Créer le post"}
				</Button>
			</form>
		</Grid>
	)
}

export default CreatePost

//@ts-ignore
const CustomCheckBoxChip = ({ value, setValue, name }) => {
	const handleClick = () => {
		//@ts-ignore
		setValue((prev) => ({ ...prev, [name]: !value }))
	}
	return (
		<Stack gap={1}>
			<Chip
				size="medium"
				sx={{ width: "80px", fontSize: 10 }}
				label={value ? "Public" : "Private"}
				variant={"outlined"}
				onClick={handleClick}
				icon={<Done />}
			/>
		</Stack>
	)
}
