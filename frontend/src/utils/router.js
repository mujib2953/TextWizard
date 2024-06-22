import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/HomePage";
import CustomEditorPage from "../pages/CustomEditorPage";
import QuillEditorPage from "../pages/QuillEditorPage";
import FilesPage from "../pages/FilesPage";
import RootLayout from "../Layout/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { Component: HomePage, index: true },
            { path: "custom-editor", Component: CustomEditorPage },
            { path: "quill-editor", Component: QuillEditorPage },
            { path: "files", Component: FilesPage },
        ]
    },

]);

export default router;
