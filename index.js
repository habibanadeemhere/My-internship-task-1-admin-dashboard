function login(e) {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value;


  localStorage.setItem("loggedInUser", name);
  localStorage.setItem("role", role);

  if (role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "salesman.html";
  }
}

