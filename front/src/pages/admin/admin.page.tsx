import { useQuery, useQueryClient } from "@tanstack/react-query"
import PageContainer from "../../components/PageContainer/PageContainer"
import instaliteApi from "../../utils/axios/axiosConnection"
import { IUser } from "../../types/user.type"
import UserRow from "../../components/UserRow/UserRow"
import { Grid, Typography } from "@mui/material"
import { Suspense, useState } from "react"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import toast from "react-hot-toast"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import EditUserModal from "../../components/EditUserModal/EditUserModal"


const AdminPage = () => {
    const { token } = useAuthContext()
    const queryClient = useQueryClient()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [userId, setUserId] = useState<number | undefined>(undefined)
    const [isOperationLoading, setIsOperationLoading] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editedUser, setEditedUser] = useState<IUser | undefined>(undefined)

    const { data: users, } = useQuery({
        queryKey: ["getAllNoneAdminUsers"], 
        queryFn: async () => {
            instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
            const { data } = await instaliteApi.get<IUser[]>("users/")
            return data
        }
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
            queryClient.refetchQueries({ queryKey: ['getAllNoneAdminUsers'], type: 'active' })
        } catch (error) {
            console.error(error)

            toast.success("Une erreur est survenue lors de la suppression")
        }
        
        setIsDeleteModalOpen(false)
        setIsOperationLoading(false)
    }

    const handleOpenEditModal = (user: IUser) => {
        setEditedUser(user)
        setIsEditModalOpen(true)
    }

    const handlePersonalInfosUpdate = async (
        firstname: string, 
        lastname: string, 
        email: string, 
    ) => {
        setIsOperationLoading(true)

        try {
            instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
            // TODO: 
            await instaliteApi.put(`users/admin/user/${editedUser?.id}`, { firstname, lastname, email })

            toast.success("Le compte à été bien modifié !")
            // Refetching query to get new data
            queryClient.refetchQueries({ queryKey: ['getAllNoneAdminUsers'], type: 'active' })
        } catch (error) {
            console.error(error)
            toast.error("Une erreur est survenu lors de la modification !")
        }

        setIsEditModalOpen(false)
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
                {editedUser && 
                    <EditUserModal 
                        isOpen={isEditModalOpen} 
                        setIsOpen={setIsEditModalOpen} 
                        user={editedUser} 
                        handleUpdate={handlePersonalInfosUpdate} 
                        isLoading={false} />
                }
            </Suspense>
            <Grid container direction="column" style={{ padding: "20px 0px" }}>
                <Typography variant="h5" fontWeight="bold" style={{ marginBottom: 20 }}>Gestion des utilisateurs</Typography>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    style={{
                        padding: "12px 0px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#f7f1f1"
                    }}>
                        <Typography style={{ width: 50, fontWeight: "bold", textAlign: "center" }}>ID</Typography>
                        <Typography style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>Nom</Typography>
                        <Typography style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>Prénom</Typography>
                        <Typography style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>E-mail</Typography>
                        <Typography style={{ width: 50, fontWeight: "bold", textAlign: "center" }}>Role</Typography>
                        <Typography style={{ width: 150, fontWeight: "bold", textAlign: "center" }}>Actions</Typography>
                </Grid>
                {users &&
                    users.map(user => (
                        <UserRow 
                            key={user.id} 
                            user={user} 
                            openDeleteModal={() => handleOpenDeleteModal(user.id)}
                            openEditModal={() => handleOpenEditModal(user)} />
                    ))
                }
            </Grid>
		</PageContainer>
    )
}

export default AdminPage