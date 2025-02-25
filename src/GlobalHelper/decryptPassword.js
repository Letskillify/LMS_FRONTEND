const SECRET_KEY = import.meta.env.VITE_JWT_SECRET;

const decryptPassword = (encryptedPassword) => {
    if (!encryptedPassword) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export default decryptPassword;