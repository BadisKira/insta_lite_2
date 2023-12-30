import { RouteObject } from "react-router-dom"

import { ProtectedRoute } from "./ProtectedRoute"
import { Suspense, lazy } from "react"
import { LoaderFullScreen } from "../components/Loader"

const Loadable = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
	(
		<Suspense fallback={<LoaderFullScreen />}>
			<Component {...props} />
		</Suspense>
	)

const SignInUpPage = Loadable(lazy(() => import("../pages/auth/auth.page")))
const ErrorPage = Loadable(lazy(() => import("../pages/notFound/notFound.page")))
const UserPortfolioPage = Loadable(lazy(() => import("../pages/portfolio/userPortfolio.page")))
const FeedPage = Loadable(lazy(() => import("../pages/feed/Feed.page")))
const ProfilPage = Loadable(lazy(() => import("../pages/profil/profil.page")))
const AdminPage = Loadable(lazy(() => import("../pages/admin/admin.page")))
const DashboardPage = Loadable(lazy(() => import("../pages/dashboad/dashboard.page")))

const freeRoutes: RouteObject = {
	path: "/",
	children: [
		{
			index: true,
			element: <FeedPage />,
		},
		{
			path: "auth",
			element: <SignInUpPage />,
		},
		{
			path: "*",
			element: <ErrorPage />,
		},
	],
}

const authenticatedRoutesMayebe: RouteObject = {
	path: "/",
	children: [
		{
			path: "profile",
			element: (
				<ProtectedRoute allowedRoles={["ADMIN", "SUPERUSER", "USER"]}>
					<ProfilPage />
				</ProtectedRoute>
			),
		},
	],
}

const adminRoutes: RouteObject = {
	path: "/admin",
	children: [
		{
			index: true,
			element: (
				<ProtectedRoute allowedRoles={["ADMIN"]}>
					<AdminPage />
				</ProtectedRoute>
			),
		},
		{
			path: "dashboard",
			element: (
				<ProtectedRoute allowedRoles={["ADMIN"]}>
					<DashboardPage />
				</ProtectedRoute>
			),
		},
		{
			path: "users",
			children: [
				{
					path: ":userId",
					element: (
						<ProtectedRoute allowedRoles={["ADMIN"]}>
							<UserPortfolioPage />
						</ProtectedRoute>
					),
				},
			],
		},
	],
}

const routes: RouteObject[] = [freeRoutes, authenticatedRoutesMayebe, adminRoutes]

export type HeaderRouteType = { path: string; elementName: string }

export const headerRoutes: HeaderRouteType[] = [
	{
		path: "/",
		elementName: "Acceuil",
	},
	{
		path: "/artists",
		elementName: "Artistes",
	},
]

export const headerRoutesAuthenticatedUsers: HeaderRouteType[] = [
	{
		path: "/profile",
		elementName: "Profile",
	},
]

export const headerRoutesAdmin: HeaderRouteType[] = [
	{
		path: "/admin",
		elementName: "Utilisateurs",
	},
	{
		path: "/admin/dashboard",
		elementName: "Dashboard",
	},
]
export default routes
