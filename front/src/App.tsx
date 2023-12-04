
import { Navigate, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth/auth.page"
import HomePage from "./pages/home/home.page"
import NotFoundPage from "./pages/notFound/notFound.page"
import { useAuthContext } from "./hooks/useAuthContext.hook"
import ProfilPage from "./pages/profil/profil.page"
import AdminPage from "./pages/admin/admin.page"


const App = () => {
	const { isLoading, isAuthenticated, user } = useAuthContext()

	return (
		<>
			{!isLoading &&
				<Routes>
					{isAuthenticated ?
						<>
							<Route path="/home" element={ <HomePage /> } />
							<Route path="/profil" element= { <ProfilPage /> } />
							{user?.role === "ADMIN" && <Route path="/admin" element= { <AdminPage /> } />}

							{ /** Private routes above this comment */ }
							<Route path="/" element={ <Navigate to="/home" /> } />
							<Route path="*" element={ <NotFoundPage />} />
						</>
						:
						<>
							<Route path="/" element={ <AuthPage /> } />

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
