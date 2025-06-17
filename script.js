document.getElementById("loginBtn").onclick = function() {
  document.getElementById("loginModal").style.display = "block";
};

document.getElementById("closeModal").onclick = function() {
  document.getElementById("loginModal").style.display = "none";
};

document.getElementById("loginForm").onsubmit = function(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Simulación simple de login
  if (user === "admin" && pass === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Credenciales incorrectas.");
  }
};
