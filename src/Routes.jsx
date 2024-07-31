import { RouterProvider } from "react-router";
import {
    createBrowserRouter,
    useLocation,
    useNavigate,
} from "react-router-dom";
import TodoAdd from "./modules/TodoAdd";
import TodoListing from "./modules/TodoListing";
import { useEffect } from "react";

function RedirectToLisiting() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/listing')
    }, [navigate])

    return null
}

function SharedLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className="flex">
                <p
                    className={`flex-1 cursor-pointer text-center border-2 text-lg py-5 ${location.pathname === "/add"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                        }`}
                    onClick={() => navigate("/add")}
                >
                    Add Todo
                </p>
                <p
                    className={`flex-1 cursor-pointer text-center border-2 text-lg py-5 ${location.pathname === "/listing"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                        }`}
                    onClick={() => navigate("/listing")}
                >
                    Todo Listing
                </p>
            </div>
            {children}
        </>
    );
}


function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RedirectToLisiting />
        },
        {
            path: "/add",
            element: (
                <SharedLayout>
                    <TodoAdd />
                </SharedLayout>
            ),
        },
        {
            path: "/listing",
            element: (
                <SharedLayout>
                    <TodoListing />
                </SharedLayout>
            ),
        },
    ]);
    return <RouterProvider router={router} />;
}

export default Routes;
