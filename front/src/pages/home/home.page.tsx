
import { Button } from "@mui/material"
import PageContainer from "../../components/PageContainer/PageContainer"
import { useAuthContext } from "../../hooks/useAuthContext.hook"

const HomePage = () => {
	const { logOut } = useAuthContext()

	const disconnect = () => {
		logOut()
	}

    return (
		<PageContainer>
			<Button onClick={disconnect}>disconnect</Button>
		</PageContainer>
    )
}

export default HomePage