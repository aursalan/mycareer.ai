// utils/userService.js
export const getOrCreateUserId = async () => {
  // First check if we already have a pending request
  if (sessionStorage.getItem("userId_pending")) {
    while (sessionStorage.getItem("userId_pending") === "true") {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return sessionStorage.getItem("userId");
  }

  try {
    sessionStorage.setItem("userId_pending", "true");
    
    // Return existing ID if available
    const existingId = sessionStorage.getItem("userId");
    if (existingId) return existingId;

    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST"
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("userId_created", "true");
    return data.userId;
  } catch (error) {
    console.error("User ID creation failed:", error);
    throw error;
  } finally {
    sessionStorage.removeItem("userId_pending");
  }
};