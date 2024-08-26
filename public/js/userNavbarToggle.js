// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const summonButton = document.getElementById("summonButton");
    const playerButton = document.getElementById("playerButton");
    const questButton = document.getElementById("questButton");
    const messageButton = document.getElementById("messageButton");
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, show profile, player, logout and summon buttons and hide login and register buttons
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      summonButton.classList.remove("d-none");
      playerButton.classList.remove("d-none");
      questButton.classList.remove("d-none");
      messageButton.classList.remove("d-none");
    } else if (!token) {
      // Token does not exist, show login and register buttons and hide profile, player, summon and logout buttons
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      playerButton.classList.add("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
      summonButton.classList.add("d-none");
      questButton.classList.add("d-none");
      messageButton.classList.add("d-none");
    }
    
  
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "index.html";
    });
  });