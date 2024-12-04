const apiBaseUrl = "http://localhost:3000";

const postAuthorSelect = document.getElementById("postAuthor");
const getAuthors = async () => {

  try {
    // Cargar lista de autores
    const usersResponse = await fetch(`${apiBaseUrl}/users`);
    const users = await usersResponse.json();

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      postAuthorSelect.appendChild(option);
    });

} catch (error) {
    console.error("Error al cargar los autores:", error);
}
};

getAuthors();
// Manejar el envío del formulario
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const postTitle = document.getElementById("postTitle").value;
  const postAuthor = postAuthorSelect.value;
  const postContent = document.getElementById("postContent").value;

  try {
    await fetch(`${apiBaseUrl}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: postTitle, content: postContent, autorId: parseInt(postAuthor) }),
    });
    alert("Post creado exitosamente");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error al crear el post:", error);
  }
});