
import Cookies from "js-cookie";

const sendAuthorizedFetch = async (url, body) => {
  try {
    const jwtToken = Cookies.get("jwtToken");
    const response = await fetch(url, {
      method: "POST", // Change this to the appropriate HTTP method
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
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

export default sendAuthorizedFetch;
