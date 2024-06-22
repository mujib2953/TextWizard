import {Link} from "react-router-dom";
import {FaFilePen, FaHouse, FaUserPen} from "react-icons/fa6";
import {FaFileExport} from "react-icons/fa";

const Navigation = () => {
    return (
        <div className="nav-bar">
            <Link to="/">
                <FaHouse /> Home
            </Link>
            <Link to="/custom-editor">
                <FaUserPen /> Custom Editor
            </Link>
            <Link to="/quill-editor">
                <FaFilePen /> Quill Editor
            </Link>
            <Link to="/files">
                <FaFileExport /> Uploaded Files
            </Link>
        </div>
    );
}

export default Navigation;
