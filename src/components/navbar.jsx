import { Link, Router } from "react-router-dom";

const navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to={"/"} aria-label="Navigate to homepage.">Home</Link></li>
            </ul>
        </nav>
    )
}

export default navbar;