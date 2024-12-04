const apiBaseUrl = "http://localhost:3000";

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  try {
    await fetch(`${apiBaseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email }),
    });
    alert("Usuario creado exitosamente");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al crear el usuario:", error);
  }
});
