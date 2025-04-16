import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Contact from "../routes/Contact";
import AddContact from "../routes/AddContact";
import EditContact from "../routes/EditContact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/contacts/:id",
        element: <Contact />
    },
    {
        path: "/add-contact",
        element: <AddContact />
    },
    {
        path: "/edit-contact/:id",
        element: <EditContact />
    }
    
]);

export default router;