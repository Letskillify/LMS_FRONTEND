import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const decryptValue = (encryptedValue) => {
  if (!encryptedValue) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default decryptValue;
