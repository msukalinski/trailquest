import { Routes, Route } from "react-router"
import MainLayout from "./components/main-layout/MainLayout"
import Home from "./components/home/Home"
import TrailsCatalog from "./components/trails-catalog/TrailsCatalog"
import CreateTrail from "./components/create-trail/CreateTrail"
import TrailDetails from "./components/trail-details/TrailDetails"
import EditTrail from "./components/edit-trail/EditTrail"
import MyTrails from "./components/my-trails/MyTrails"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import About from "./components/about/About"
import Terms from "./components/terms/Terms"
import Privacy from "./components/privacy/Privacy"
import NotFound from "./components/not-found/NotFound"

import GuestGuard from "./guards/GuestGuard"
import AuthGuard from "./guards/AuthGuard"

function App() {

	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/trails" element={<TrailsCatalog />} />
					<Route path="/trails/:trailId/details" element={<TrailDetails />} />
					<Route path="/about" element={<About />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/privacy" element={<Privacy />} />

					<Route element={<GuestGuard />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>

					<Route element={<AuthGuard />}>
						<Route path="/trails/create" element={<CreateTrail />} />
						<Route path="/trails/:trailId/edit" element={<EditTrail />} />
						<Route path="/my-trails" element={<MyTrails />} />
					</Route>

					<Route path="*" element={<NotFound />} />
					{/* <Route path="*" element={<Loader text={'Please wait'} />} /> */}
				</Route>
			</Routes>
		</>
	)
}

export default App
