import { useQuery } from "@tanstack/react-query"
import PageContainer from "../../components/PageContainer/PageContainer"
import instaliteApi from "../../utils/axios/axiosConnection"
import { IUser } from "../../types/user.type"
import { Button, Grid, Typography } from "@mui/material"
import { Suspense, useState } from "react"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import toast from "react-hot-toast"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import EditUserModal from "../../components/EditUserModal/EditUserModal"
import UserCard from "../../components/UserCard/UserCard"
import { queryClient } from "../../main"
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal"

const AdminPage = () => {
	const { token } = useAuthContext()

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [userId, setUserId] = useState<number | undefined>(undefined)
	const [isOperationLoading, setIsOperationLoading] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [editedUser, setEditedUser] = useState<IUser | undefined>(undefined)

	const { data: users } = useQuery({
		queryKey: ["getAllNoneAdminUsers"],
		queryFn: async () => {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			const { data } = await instaliteApi.get<IUser[]>("users/all")
			return data
		},
	})

	const handleOpenDeleteModal = (deletingUserId: number) => {
		setUserId(deletingUserId)
		setIsDeleteModalOpen(true)
	}

	const handleDeleteUser = async () => {
		setIsOperationLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			await instaliteApi.delete(`users/${userId}`)

			toast.success("Utilisateur supprimé avec succès")
			// Refetching query to get new data
			queryClient.refetchQueries({ queryKey: ["getAllNoneAdminUsers"] })
		} catch (error) {

			toast.success("Une erreur est survenue lors de la suppression")
		}

		setIsDeleteModalOpen(false)
		setIsOperationLoading(false)
	}

	const handleOpenEditModal = (user: IUser) => {
		setEditedUser(user)
		setIsEditModalOpen(true)
	}

	const handlePersonalInfosUpdate = async (firstname: string, lastname: string, email: string, role: string) => {
		setIsOperationLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			await instaliteApi.put(`users/${editedUser?.id}`, { firstname, lastname, email, role })
			toast.success("Le compte à été bien modifié !")
			// Refetching query to get new data
			queryClient.refetchQueries({ queryKey: ["getAllNoneAdminUsers"] })
		} catch (error) {
			toast.error("Une erreur est survenu lors de la modification !")
		}

		setIsEditModalOpen(false)
		setIsOperationLoading(false)
	}

	const handleCreateUser = async (
		firstname: string,
		lastname: string,
		email: string,
		password: string,
		role: string
	) => {
		setIsOperationLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			await instaliteApi.post(`users`, { firstname, lastname, email, password, role })
			toast.success("Le compte à été bien créé !")
			// Refetching query to get new data
			queryClient.refetchQueries({ queryKey: ["getAllNoneAdminUsers"] })
			setIsCreateModalOpen(false)
		} catch (error) {
			toast.error("Une erreur est survenu lors de la création !")
		}

		setIsOperationLoading(false)
	}

	return (
		<PageContainer withHeader={true}>
			<Suspense>
				<DeleteModal
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
					deleteWording={"Voulez-vous confirmer la suppresion de cet utilisateur ?"}
					handleDelete={handleDeleteUser}
					isLoading={isOperationLoading}
				/>
				{editedUser && (
					<EditUserModal
						isOpen={isEditModalOpen}
						setIsOpen={setIsEditModalOpen}
						user={editedUser}
						handleUpdate={handlePersonalInfosUpdate}
						isLoading={isOperationLoading}
					/>
				)}
				{isCreateModalOpen && (
					<CreateUserModal
						isOpen={isCreateModalOpen}
						setIsOpen={() => setIsCreateModalOpen(!isCreateModalOpen)}
						handleCreate={handleCreateUser}
						isLoading={isOperationLoading}
					/>
				)}
			</Suspense>
			<Grid container style={{ padding: "50px 0px" }}>
				<Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
					<Typography variant="h5" fontWeight="bold" style={{ width: "fit-content" }}>
						Gestion des utilisateurs
					</Typography>
					<Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
						Créer un utilisateur
					</Button>
				</Grid>

				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{users &&
						users.map((user) => (
							<UserCard
								key={user.id}
								user={user}
								handleDelete={() => handleOpenDeleteModal(user.id)}
								handleUpdate={() => handleOpenEditModal(user)}
							/>
						))}
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default AdminPage
