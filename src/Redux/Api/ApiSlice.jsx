import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const IS_PRODUCTION = import.meta.env.VITE_IS_PRODUCTION === "true";

console.log("IS_PRODUCTION", IS_PRODUCTION);

// Import the correct key and IV from environment variables
const secretKeyHex = import.meta.env.VITE_CRYPTO_KEY; // 32-byte key (hex)
const ivHex = import.meta.env.VITE_CRYPTO_IV; // 16-byte IV (hex)

// Convert hex string to Uint8Array
function hexToUint8Array(hex) {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

// Convert Uint8Array to hex string
function uint8ArrayToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Encrypt data before sending to the server
async function encryptRequest(data) {
  if (!secretKeyHex || secretKeyHex.length !== 64) {
    throw new Error(
      "Invalid secret key length. Expected 32 bytes (64 hex characters)."
    );
  }

  const keyBuffer = hexToUint8Array(secretKeyHex);
  const ivBuffer = hexToUint8Array(ivHex);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  // Import key for AES-256-CBC
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Encrypt data
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBuffer },
    key,
    encodedData
  );

  return {
    encryptedData: uint8ArrayToHex(encryptedBuffer),
    iv: ivHex, // Send IV as hex
  };
}

// Decrypt response from the server
async function decryptResponse(encryptedData, iv) {
  const keyBuffer = hexToUint8Array(secretKeyHex);
  const ivBuffer = hexToUint8Array(iv);
  const encryptedBuffer = hexToUint8Array(encryptedData);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBuffer },
    key,
    encryptedBuffer
  );

  return new TextDecoder().decode(decrypted);
}

const customBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({ baseUrl: "/api" });

  let modifiedArgs = args;

  // Check if the body is FormData (file uploads)
  if (args.body && !(args.body instanceof FormData)) {
    try {
      modifiedArgs = {
        ...args,
        body: await encryptRequest(args.body),
      };
    } catch (error) {
      console.error("Request Encryption Error:", error);
    }
  }

  const response = await baseQuery(modifiedArgs, api, extraOptions);

  // Decrypt only if response contains encryptedData and iv
  if (response.data?.encryptedData && response.data?.iv) {
    try {
      const decryptedText = await decryptResponse(
        response.data.encryptedData,
        response.data.iv
      );
      response.data = JSON.parse(decryptedText);
    } catch (error) {
      console.error("Response Decryption Error:", error);
      response.error = { message: "Decryption error" };
    }
  }

  return response;
};

// Create API Slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: IS_PRODUCTION ? customBaseQuery : fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "ImageUpload",
    "Institute",
    "Student",
    "Teacher",
    "Class",
    "Board",
    "configureStore",
    "Medium",
    "Section",
    "Semester",
    "Session",
    "Stream",
    "Shift",
    "Subject",
    "Course",
    "CourseGroup",
    "Settings",
    "EmployeeRole",
    "Allowance",
    "Deduction",
    "Auth",
    "Leaves",
    "ExamType",
    "Exam",
    "Book",
    "Holiday",
    "InstituteHoliday",
    "LiveClass",
    "StudyMaterial",
    "NonTeachingStaff",
    "NCERTClass",
    "NCERTsubject",
    "NoticeBoard",
    "NonTeachingStaff",
    "NCERTBook",
    "AdmissionEnquiry",
    "Download"
  ],
  endpoints: () => ({}),
});

export default apiSlice;