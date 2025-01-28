import React from 'react'
import { useFileUploader } from '../../Custom Hooks/CustomeHook';

const FileUploader = () => {
    const { uploadedFiles, uploadProgress, isLoading, handleFileUpload } = useFileUploader();

    return (
        <div>
            <h2>File Uploader (CSV, PDF, Docs)</h2>
        
            {/* File input */}
            <input
                type="file"
                accept=".csv,.pdf,.doc,.docx" // Limit accepted file types
                onChange={(event) => handleFileUpload(event, "file1")}
            />

            {/* Progress bar */}
            {isLoading && (
                <div style={{ width: "100%", margin: "20px 0" }}>
                    <div
                        style={{
                            width: `${uploadProgress}%`,
                            height: "10px",
                            backgroundColor: "#36d7b7",
                            transition: "width 0.2s",
                        }}
                    ></div>
                    <p>{uploadProgress}%</p>
                </div>
            )}

            {/* Display uploaded file URL */}
            {uploadedFiles["file1"] && (
                <div>
                    <p>Uploaded File URL:</p>
                    <a href={uploadedFiles["file1"]} target="_blank" rel="noreferrer">
                        {uploadedFiles["file1"]}
                    </a>
                </div>
            )}
        </div>
    );
}

export default FileUploader
