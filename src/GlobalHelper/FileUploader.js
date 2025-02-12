import { useUploadFilesMutation } from "../Redux/Api/fileUpload";

export function useFileUploader() {
  const [uploadFile, { data, isLoading, isSuccess, isError, error }] =
    useUploadFilesMutation();

  const uploadDocuments = async ({ documents }) => {
    const imageFormData = new FormData();

    Object.keys(documents).forEach((key) => {
      const file = documents[key];
      console.log("file", file);
      if (Array.isArray(file)) {
        file.forEach((f) => imageFormData.append(key, f));
      } else {
        imageFormData.append(key, file);
      }
    });

    const response = await uploadFile(imageFormData);
    return response;
  };

  return { uploadDocuments, data, isLoading, isSuccess, isError, error };
}
