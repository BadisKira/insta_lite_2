import { RouteObject } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { Suspense, lazy } from "react";
import { LoaderFullScreen } from "../components/Loader";

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<LoaderFullScreen />}>
        <Component {...props} />
      </Suspense>
    );

const SignInUpPage = Loadable(lazy(() => import("../pages/auth/auth.page")));
const ErrorPage = Loadable(
  lazy(() => import("../pages/notFound/notFound.page"))
);

const HomePage = Loadable(lazy(() => import("../pages/home/home.page")));

const FeedPage = Loadable(lazy(() => import("../pages/feed/Feed.page")));

const ProfilPage = Loadable(lazy(() => import("../pages/profil/profil.page")));

const AdminPage = Loadable(lazy(() => import("../pages/admin/admin.page")));

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
      path: "home",
      element: <HomePage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
};

const authenticatedRoutesMayebe: RouteObject = {
  path: "/",
  children: [
    {
      path: "profil",
      children: [
        {
          path: ":id",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN", "SUPERUSER", "USER"]}>
              <ProfilPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
};

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
  ],
};

const routes: RouteObject[] = [
  freeRoutes,
  authenticatedRoutesMayebe,
  adminRoutes,
];

export type HeaderRouteType = { path: string; elementName: string };
export const headerRoutes = [
  {
    path: "/home",
    elementName: "Acceuil",
  },
];

export const headerRoutesAuthenticatedUsers = [
  {
    path: "/profil",
    elementName: "Profile",
  },
];

export const headerRoutesAdmin = [
  {
    path: "/admin",
    elementName: "Admin",
  },
];
export default routes;
