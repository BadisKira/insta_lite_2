
import { Navigate, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth/auth.page"
import HomePage from "./pages/home/home.page"
import NotFoundPage from "./pages/notFound/notFound.page"
import { useAuthContext } from "./hooks/useAuthContext.hook"
import EntryPage from "./pages/entry/entry.page"
import FeedPage from "./pages/FeedPage/Feed.page"

const App = () => {
	const { isLoading, isAuthenticated } = useAuthContext()
	
	return (
		<>
			{!isLoading &&
				<Routes>
					{isAuthenticated ?
						<>
							<Route path="/home" element={ <HomePage /> } />

							{ /** Private routes above this comment */ }
							<Route path="/" element={ <FeedPage />} />
							<Route path="*" element={<NotFoundPage />} />
							
						</>
						:
						<>
							<Route path="/" element={ <EntryPage /> } />
							<Route path="/auth" element={ <AuthPage /> } />

							{ /** Public routes above this comment */ }
							<Route path="*" element={ <Navigate to="/" /> } />
						</>
					}
				</Routes>
			}
		</>

	)
}

export default App
