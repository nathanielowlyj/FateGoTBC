// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const loginText = document.getElementById("loginText");
    const logoutButton = document.getElementById("logoutButton");
    const bossFight = document.getElementById("bossFight");
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
        loginText.classList.add("d-none");
        bossFight.classList.remove("d-none");
    } else if (!token) {
        loginText.classList.remove("d-none");
        bossFight.classList.add("d-none");
    }

    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    });
  });