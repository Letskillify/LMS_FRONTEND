import React from "react";
import { useVideoUploader } from "../../Custom Hooks/CustomeHook";

const VideoUploaderComponent = () => {
    const { uploadedVideos, uploadProgress, isLoading, handleVideoUpload } = useVideoUploader();

    console.log(isLoading);
    
    return (
        <div>
            <h2>Video Uploader with Progress Bar</h2>

            {/* File input */}


            {/* Progress bar */}
            {isLoading ? (
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
            ) : (
                <div>
                    {uploadedVideos?.video1 ? (
                        <p>Video uploaded successfully!</p>
                    ) : (
                        <div>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoUpload(e, "video1")}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Display uploaded video URL */}
            {uploadedVideos["video1"] && (
                <div>
                    <p>Uploaded Video URL:</p>
                    <a href={uploadedVideos?.video1} target="_blank" rel="noreferrer">
                        {uploadedVideos["video1"]}
                    </a>
                </div>
            )}
        </div>
    );
};

export default VideoUploaderComponent;
