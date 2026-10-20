import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import UserProvider from './providers/UserProvider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<App />
				<Toaster position='top-right' />
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
)
