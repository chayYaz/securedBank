
import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";
const sendAuthorizedFetch = async (url, body) => {
  try {
    const jwtToken = Cookies.get("jwtToken");
    const publicKey = await getPublicKey();
    if (!publicKey) {
      throw new Error("Failed to fetch public key");
    }

    // Encrypt the JWT using the RSA public key
    const encryptedToken = encryptMessage(jwtToken, publicKey);
    const response = await fetch(url, {
      method: "POST", // Change this to the appropriate HTTP method
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${encryptedToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Request failed");
  }
};
const getPublicKey = async () => {
  try {
    const response = await fetch('http://localhost:3001/authToken/public-key');
    if (!response.ok) {
      throw new Error('Failed to fetch public key');
    }
    const publicKey = await response.text();
    return publicKey;
  } catch (error) {
    console.error('Error fetching public key:', error);
    return null;
  }
};
function encryptMessage(message, publicKey) {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
 
  return jsEncrypt.encrypt(message);
}

export default sendAuthorizedFetch;
