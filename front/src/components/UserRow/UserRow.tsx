import { Grid, Typography } from "@mui/material"
import { IUser } from "../../types/user.type"
import { FC } from "react"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

interface IProps {
    user: IUser
    openDeleteModal: () => void
    openEditModal: () => void
}

const UserRow: FC<IProps> = ({
    user, 
    openDeleteModal,
    openEditModal,
}) => {
    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ 
                padding: "12px 0px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fffdfd"
            }}>
                <Typography style={{ width: 50, textAlign: "center" }}>{user.id}</Typography>
                <Typography style={{ flex: 1, textAlign: "center" }}>{user.firstname}</Typography>
                <Typography style={{ flex: 1, textAlign: "center" }}>{user.lastname}</Typography>
                <Typography style={{ flex: 1, textAlign: "center" }}>{user.email}</Typography>
                <Typography style={{ width: 50, textAlign: "center" }}>{user.role}</Typography>
                <Grid 
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: 150, gap: 16 }}>
                        <CreateOutlinedIcon onClick={openEditModal} style={{ fill: "#42ee50f", width: 20, height: 20, cursor: "pointer" }} />
                        <DeleteOutlineOutlinedIcon onClick={openDeleteModal} style={{ fill:"#fc5757", width: 20, height: 20, cursor: "pointer" }} />
                </Grid>
        </Grid>
    )
}

export default UserRow