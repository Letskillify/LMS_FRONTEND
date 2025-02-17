import React from "react";
import { useFileUploader } from "../../Custom Hooks/CustomeHook";

const ImageUploadComponent = () => {
    const { uploadedData, handleFileUpload } = useFileUploader();
  
    console.log("Uploaded Data:", uploadedData);
    
    return (
      <div>
        <h2>Upload Images</h2>
        {/* Upload Profile Photo */}
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "profilePhoto")}
        />
  
        {/* Upload Marksheet */}
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "marksheet")}
        />
  
        <h3>Uploaded Data:</h3>
        <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
      </div>
    );
  };

export default ImageUploadComponent;
