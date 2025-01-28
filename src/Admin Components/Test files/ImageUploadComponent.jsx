import React from "react";
import { useImageUploader } from "../../Custom Hooks/CustomeHook";

const ImageUploadComponent = () => {
    const { uploadedData, handleImageUpload } = useImageUploader();
  
    console.log("Uploaded Data:", uploadedData);
    
    return (
      <div>
        <h2>Upload Images</h2>
        {/* Upload Profile Photo */}
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, "profilePhoto")}
        />
  
        {/* Upload Marksheet */}
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, "marksheet")}
        />
  
        <h3>Uploaded Data:</h3>
        <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
      </div>
    );
  };

export default ImageUploadComponent;
