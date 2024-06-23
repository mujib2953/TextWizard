import React, { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const QuillEditorPage = () => {
    const [contentHtml, setContentHtml] = useState("");

    return (
        <div className="quill-editor-page">
            This is Quill Editor Page.
            <ReactQuill
                theme="snow"
                value={contentHtml}
                onChange={setContentHtml}
            />
        </div>
    );
};

export default QuillEditorPage;
