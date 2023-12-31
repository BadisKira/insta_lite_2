import { useCallback, useEffect, useMemo, useState } from "react"
import PageContainer from "../../components/PageContainer/PageContainer"
import { Grid, TextField, Typography } from "@mui/material"
import { debounce } from "lodash"
import { useQuery } from "@tanstack/react-query"
import { IUser } from "../../types/user.type"
import UserCard from "../../components/UserCard/UserCard"
import useAxios from "../../hooks/useAxios";
const ArtistsPage = () => {
	
	const instaliteApi = useAxios();

	const [name, setName] = useState<string>("")

	const debounceGetFilteredUsers = useMemo(
		() =>
			debounce((value: string) => {
				setName(value)
			}, 2000),
		[]
	)

	const getFilteredUsers = useCallback(
		(value: string) => {
			debounceGetFilteredUsers(value)
		},
		[debounceGetFilteredUsers]
	)

	const { data: users, refetch } = useQuery({
		queryKey: ["getAllNoneAdminUsers"],
		queryFn: async () => {
			const { data } = await instaliteApi.get<IUser[]>(`users/search?name=${name}`)
			return data
		},
	})

	useEffect(() => {
		refetch()
	}, [name])

	return (
		<PageContainer withHeader={true}>
			<Grid container style={{ padding: "25px 0px", gap: 2 }}>
				<Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
					<Typography variant="h5" fontWeight="bold" style={{ width: "fit-content" }}>
						Artists
					</Typography>
				</Grid>
				<Grid>
					<TextField
						label="Recherche par nom"
						placeholder="Recherche par nom"
						variant="outlined"
						size="small"
						value={name}
						onChange={(e) => {
							setName(e.target.value)
							getFilteredUsers(e.target.value)
						}}
						style={{ margin: "10px 0px" }}
					/>
				</Grid>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{users && users.map((user) => <UserCard key={user.id} redirectionUrl="artists" user={user} />)}
				</Grid>
			</Grid>
		</PageContainer>
	)
}

export default ArtistsPage
