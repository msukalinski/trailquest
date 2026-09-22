import { Routes, Route } from "react-router"
import MainLayout from "./components/layout/MainLayout"
import Home from "./components/home/Home"
import TrailsCatalog from "./components/trails/TrailsCatalog"
import CreateTrail from "./components/trails/CreateTrail"
import TrailDetails from "./components/trails/TrailDetails"
import EditTrail from "./components/trails/EditTrail"
import MyTrails from "./components/trails/MyTrails"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import NotFound from "./components/shared/NotFound"
import Loader from "./components/shared/Loader"

function App() {

	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />

					<Route path="/trails" element={<TrailsCatalog />} />

					<Route path="/trails/create" element={<CreateTrail />} />

					<Route path="/trails/:trailId" element={<TrailDetails />} />

					<Route path="/trails/:trailId/edit" element={<EditTrail />} />

					<Route path="/my-trails" element={<MyTrails />} />

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Register />} />

					<Route path="*" element={<NotFound />} />
					{/* <Route path="*" element={<Loader text={'Please wait'} />} /> */}
				</Route>
			</Routes>
		</>
	)
}

export default App
