function generateCryptoKeys() {
    const keyBuffer = window.crypto.getRandomValues(new Uint8Array(32)); // 32 bytes
    const ivBuffer = window.crypto.getRandomValues(new Uint8Array(16)); // 16 bytes
  
    const keyHex = Array.from(keyBuffer).map(b => b.toString(16).padStart(2, "0")).join("");
    const ivHex = Array.from(ivBuffer).map(b => b.toString(16).padStart(2, "0")).join("");
  
    console.log("VITE_CRYPTO_KEY =", keyHex);
    console.log("VITE_CRYPTO_IV =", ivHex);
  }
  
//   generateCryptoKeys();
  