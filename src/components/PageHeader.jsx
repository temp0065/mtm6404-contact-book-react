import ContactSearchForm from "./ContactSearchForm";
import { Link } from "react-router-dom";

function PageHeader({ children, backBtn }) {
    return (
        <header className='d-flex flex-column justify-content-center align-items-center p-3 mb-5 bg-body-secondary header-section'>
            <div className="w-75 d-flex flex-column gap-3">
                {backBtn && <Link to="/"><i className="bi bi-chevron-left"></i> Return to contacts</Link>}
                <div className="text-center m-auto">
                    { children }
                </div>
            </div>
        </header>
    )
}

export default PageHeader;