import {useEffect, useState} from "react";
import axios from "axios";
import {
    FaFileExcel,
    FaFileWord,
    FaFilePowerpoint,
    FaFileCsv,
    FaFilePdf,
    FaFileZipper,
    FaFileCode,
    FaFileVideo,
    FaFileAudio,
    FaFileImage,
    FaFile
} from "react-icons/fa6";

const iconsDict = {
    excel: ["xls", "xlsx", "xlsx"],
    word: ["doc", "docx", "docm", "dotx"],
    powerpoint: ["ppt", "pptx"],

    csv: ["csv"],

    pdf: ["pdf"],
    zip: ["zip", "rar"],
    code: [".html", ".css", ".js", ".java", ".jsx"],

    video: ["mp4", "avi"],
    audio: ["mp3"],
    image: ["jpg", "jpeg", "png"],
};

const FilesPage = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/upload")
            .then(res => setUploadedFiles(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleFilesUpload = () => {
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files", selectedFiles[i]);
        }

        axios
            .post(`/api/v1/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    const handleFileDownload = (filename) => {
        axios({
            url: `/api/v1/download/${filename}`,
            method: "GET",
            responseType: "blob",

        })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename); // or any other extension
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => console.error(err));
    };

    const getFileIcon = (extension) => {
        for (let key in iconsDict) {
            if (iconsDict[key].includes(extension)) {
                switch (key) {
                    case "excel":
                        return <FaFileExcel />;
                    case "word":
                        return <FaFileWord />;
                    case "powerpoint":
                        return <FaFilePowerpoint />;

                    case "csv":
                        return <FaFileCsv />;

                    case "pdf":
                        return <FaFilePdf />;
                    case "zip":
                        return <FaFileZipper />;
                    case "code":
                        return <FaFileCode />;
                    case "video":
                        return <FaFileVideo />;
                    case "audio":
                        return <FaFileAudio />;
                    case "image":
                        return <FaFileImage />;
                }
            }
        }

        return <FaFile />;
    };

    return (
        <div className="files-page">
            <div className="upload-container">
                <div>
                    <input
                        type="file"
                        multiple={true}
                        onChange={({target: {files}}) => setSelectedFiles(files)}
                    />

                    <button
                        onClick={handleFilesUpload}
                        disabled={selectedFiles.length === 0}
                    >Upload
                    </button>
                </div>
            </div>

            <div className="upload-files-container">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                        {uploadedFiles.map((file) => {
                            const _split = file.split(".")
                            const [ext, ...name] = _split.reverse();

                            return (
                                <tr
                                    key={file}
                                    onClick={() => handleFileDownload(file)}
                                >
                                    <td>{name}</td>
                                    <td>
                                        { getFileIcon(ext) }
                                        {ext}
                                    </td>
                                </tr>
                            );

                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FilesPage;
