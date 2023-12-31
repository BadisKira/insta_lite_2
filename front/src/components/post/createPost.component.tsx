import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ICreatePost } from "../../types/post.type"
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"
import { useState } from "react"
import Loader from "../Loader"
import useAxiosPrivate from "../../hooks/useAxios"
import toast from "react-hot-toast"

const CreatePost = ({ userId }: { userId: number }) => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [imageData, setImageData] = useState<File | undefined>(undefined)
	const [isPublic, setIsPublic] = useState(true)

	const queryPost = useQueryClient()

	const instaliteApi = useAxiosPrivate()

	const createPostFn = async (post: ICreatePost) => {
		const postFormData = new FormData()

		postFormData.append("title", post.title)
		postFormData.append("description", post.description)
		postFormData.append("isPublic", post.isPublic ? "true" : "false")

		if (post.data) {
			postFormData.append("data", post.data)
		}
		postFormData.append("postType", "IMAGE")
		postFormData.append("userId", String(post.userId))

		const response = await instaliteApi.postForm(`posts`, postFormData, {})
		return await response.data
	}

	const { mutateAsync: createPostMutate, isPending } = useMutation({
		mutationKey: ["feedposts"],
		mutationFn: async (post: ICreatePost) => await createPostFn(post),
		onError: () => {
			toast.error("Une erreur est survenue ! Réessayez !")
		},
		onSuccess: () => {
			toast.success("Le post à été créé !")
			queryPost.invalidateQueries({
				queryKey: ["userAllPosts"],
			})

			setTitle("")
			setDescription("")
			setImageData(undefined)
			setIsPublic(true)
		},
	})

	const handleCreatePost = async () => {
		if (imageData === undefined) {
			toast.error("Ajoutez une image !")
			return
		}

		if (title === "" || description === "") {
			toast.error("Le titre et la description sont obligatoires !")
			return
		}

		const postPayload: ICreatePost = {
			data: imageData,
			isPublic,
			description,
			postType: "IMAGE",
			title,
			userId,
		}

		await createPostMutate(postPayload)
	}

	return (
		<Grid
			container
			direction="column"
			style={{
				padding: 30,
				marginTop: 3,
				borderRadius: 12,
				gap: 18,
				backgroundColor: "",
				boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
			}}>
			<Grid>
				<TextField
					fullWidth
					variant="outlined"
					value={title}
					label="Titre"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Grid>
			<Grid>
				<TextField
					variant="outlined"
					required
					value={description}
					label="Description"
					name="description"
					multiline
					fullWidth
					rows={1}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Grid>

			<Grid>
				<label htmlFor="upload-photo">
					<input
						style={{ display: "none" }}
						id="upload-photo"
						name="upload-photo"
						type="file"
						accept={"image/*"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.target.files) {
								setImageData(e.target.files[0])
							}
						}}
					/>

					<Button color="primary" variant="outlined" component="span">
						{imageData ? imageData.name : "Ajouter une image"}
					</Button>
				</label>
			</Grid>

			<Grid container justifyContent="flex-start" alignItems="center">
				<FormControl>
					<FormLabel id="visibility-radio-buttons-group-label">Visibilité</FormLabel>
					<RadioGroup
						aria-labelledby="visibility-radio-buttons-group-label"
						defaultValue="public"
						name="radio-buttons-group"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsPublic(e.target.value === "public")}>
						<Grid container justifyContent="flex-start" alignItems="center" style={{ gap: 12 }}>
							<FormControlLabel value="public" control={<Radio />} label="Publique" />
							<FormControlLabel value="private" control={<Radio />} label="Privé" />
						</Grid>
					</RadioGroup>
				</FormControl>
			</Grid>

			<Button type="submit" variant="contained" onClick={handleCreatePost}>
				{isPending ? <Loader /> : "Créer le post"}
			</Button>
		</Grid>
	)
}

export default CreatePost
