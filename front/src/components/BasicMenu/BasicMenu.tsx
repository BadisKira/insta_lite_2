import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

interface IProps {
	anchorEl: HTMLElement | null
	menuElements: string[]
	open: boolean
	handleMenuElementClick: (element: "Modifier" | "Supprimer") => void
	handleClose: () => void
}

const BasicMenu = ({ anchorEl, menuElements, open, handleMenuElementClick, handleClose }: IProps) => {
	return (
		<Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			MenuListProps={{
				"aria-labelledby": "basic-button",
			}}>
			{menuElements.map((element) => (
				<MenuItem
					key={element}
					onClick={() => {
						if (element === "Modifier" || element === "Supprimer") {
							handleMenuElementClick(element)
							handleClose()
						}
					}}>
					<ListItemIcon>
						{element === "Modifier" && <EditIcon />}
						{element === "Supprimer" && <DeleteIcon />}
					</ListItemIcon>
					<ListItemText>{element}</ListItemText>
				</MenuItem>
			))}
		</Menu>
	)
}

export default BasicMenu
