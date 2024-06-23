import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import {FaCircleInfo} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

import "react-quill/dist/quill.snow.css";

const QuillEditorPage = () => {
    const [contentHtml, setContentHtml] = useState("");
    const [filesList, setFilesList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [infoMsg, setInfoMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/v1/files")
            .then(res => setFilesList(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedFile) {
            axios
                .get(`api/v1/files/${selectedFile}`)
                .then(res => setContentHtml(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedFile]);

    const handleFileSave = () => {
        axios
            .put(`api/v1/files/${selectedFile}`, {content: contentHtml})
            .then(res => {
                setInfoMsg("File saved successfully.");

                setTimeout(() => {
                    setInfoMsg("")
                }, 5000)
            })
            .catch(err => console.error(err));
    };

    const handleAddNewFile = () => {
        const filename = prompt("Please enter the file name.");

        // --- validation of file-name on front-end
        if (filesList.map(i => i.toLowerCase()).includes(filename.trim().toLowerCase())) {
            alert("Sorry!! File name already exists!.");
            return undefined;
        }

        axios
            .put(`api/v1/files/${filename.trim()}`, {content: ""})
            .then(res => {
                alert("File created successfully.");
                navigate(0);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="quill-editor-page">
            <div className="files-list">
                <button onClick={handleAddNewFile}>Add New File</button>
                {
                    filesList && filesList.length > 0 ? (
                        filesList.map(item => {
                            return (
                                <div
                                    className={item === selectedFile ? "active" : ""}
                                    key={item}
                                    onClick={() => setSelectedFile(item)}
                                >
                                    {item}
                                </div>
                            )
                        })
                    ) : undefined
                }
            </div>
            <div className="editor">
                {
                    !selectedFile && (
                        <div className="info-msg">
                            <FaCircleInfo />
                            Please select file to open.
                        </div>
                    )
                }
                {
                    selectedFile && (
                        <>
                            <div className="file-name"><span>{selectedFile}</span></div>

                            {
                                infoMsg && (
                                    <div className="info-msg">{infoMsg}</div>
                                )
                            }

                            <ReactQuill
                                theme="snow"
                                value={contentHtml}
                                onChange={setContentHtml}
                            />

                            <div className="btn-container">
                                <button onClick={handleFileSave}>Save</button>
                                <button onClick={() => {
                                    setSelectedFile(null);
                                    setContentHtml("");
                                }}>Close</button>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default QuillEditorPage;
