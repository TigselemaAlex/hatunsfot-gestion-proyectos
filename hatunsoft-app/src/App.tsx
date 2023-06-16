import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import "dayjs/locale/es"
import { SnackbarProvider } from "notistack"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CheckSession, RequireAuth } from "./components"
import { AppLayout } from "./layouts"
import { PublicRoutes, managerRoutes } from "./models"
import { Project, Projects, Users } from "./pages"
import Login from "./pages/Login/Login"
import { theme } from "./theme/theme"
import { SnackbarManagerConfigurator } from "./utils"

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <DatesProvider settings={{ locale: "es" }}>
        <SnackbarProvider>
          <SnackbarManagerConfigurator />
          <BrowserRouter>
            <Routes>
              <Route path={PublicRoutes.DEFAULT} element={<CheckSession />}>
                <Route index element={<Navigate to={PublicRoutes.LOGIN} />} />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route element={<AppLayout />}>
                  <Route path={managerRoutes.projects} element={<Projects />} />
                  <Route path="/app/project/:idProject"element={<Project />} />
                  <Route path={managerRoutes.users} element={<Users />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to={PublicRoutes.LOGIN} />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </DatesProvider>
    </MantineProvider>
  )
}

export default App
