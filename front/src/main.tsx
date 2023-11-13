import { BrowserRouter } from "react-router-dom"
import { transformMinutesToMilliseconds } from "./utils/transform.util"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import App from "./App"
import { Toaster } from "react-hot-toast"
import ReactDOM from 'react-dom/client'
import AuthProvider from "./context/auth.context"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: transformMinutesToMilliseconds(10),
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
    <BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<AuthProvider>
				<Toaster position="bottom-center" />
				<App />
			</AuthProvider>
		</QueryClientProvider>
	</BrowserRouter>,
)
