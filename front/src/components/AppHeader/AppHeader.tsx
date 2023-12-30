import { FC } from "react"
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import { headerRoutes, headerRoutesAdmin , headerRoutesAuthenticatedUsers } from "../../router";

interface IProps {
}



const AppHeader: FC<IProps> = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  

    return (
      <AppBar
        position="sticky"
        style={{ height: 60, backgroundColor: " #363232" }}
      >
        <Toolbar
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            xs={10}
            lg={8}
            height="100%"
          >
            <Typography variant="h6" color="#f8fcff" fontWeight="bold" flex={1}>
              <Link
                to={"/"}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Instalite II
              </Link>
            </Typography>

            <Grid
              flex={2}
              container
              justifyContent="center"
              alignItems="center"
              width="fit-content"
              color="white"
              style={{ gap: 32 }}
            >
              {headerRoutes.length> 0 && headerRoutes.map((h) => (
                <Link
                  to={h.path}
                  style={{ textDecoration: "none", color: "white" }}
                  key={h.path}
                >
                  <Typography style={{ opacity: "0.7" }}>
                    {h.elementName}
                  </Typography>
                </Link>
              ))}
              {user?.role === "ADMIN" && (
                <>
                  {headerRoutesAdmin.length > 0 &&
                    headerRoutesAdmin.map((h) => (
                      <Link
                        to={h.path}
                        style={{ textDecoration: "none", color: "white" }}
                        key={h.path}
                      >
                        <Typography style={{ opacity: "0.7" }}>
                          {h.elementName}
                        </Typography>
                      </Link>
                    ))}
                </>
              )}

              {user && isAuthenticated ? (
                <Grid flex={1} container justifyContent="flex-end">
                  <>
                    {headerRoutesAuthenticatedUsers.map((h) => (
                      <Link
                        to={h.path+'/'+user.id}
                        style={{ textDecoration: "none", color: "white" }}
                        key={h.path}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          style={{ gap: 4 }}
                        >
                          <AccountCircleOutlinedIcon
                            style={{ width: 30, height: 30 }}
                          />
                          <Typography>
                            {user?.firstname} {user?.lastname}
                          </Typography>
                        </Grid>
                      </Link>
                    ))}
                  </>
                </Grid>
              ) : (
                <Button onClick={() => navigate("/auth")}> Login </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default AppHeader;
