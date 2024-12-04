const apiBaseUrl = "http://localhost:3000";

// Cargar detalles del post al cargar la página

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const postTitle = document.getElementById("postTitle");
  const postAuthor = document.getElementById("postAuthor");
  const postContent = document.getElementById("postContent");
  const commentsList = document.getElementById("commentsList");
  const commentForm = document.getElementById("commentForm");
  const commentAuthorSelect = document.getElementById("commentAuthor");

  const getPost = async () => {

      try {
        // Cargar detalles del post con el nombre del autor
        const postResponse = await fetch(`${apiBaseUrl}/articles/${postId}`);
        const post = await postResponse.json();
    
        const authorResponse = await fetch(`${apiBaseUrl}/users/${post.autorId}`);
        const author = await authorResponse.json();
    
        postTitle.textContent = post.title;
        postAuthor.textContent = `Autor: ${author.name}`;
        postContent.textContent = post.content;
    
        // Cargar comentarios con los nombres de los autores
        await loadComments(postId);
    
        // Cargar lista de usuarios en el formulario de comentarios
        const usersResponse = await fetch(`${apiBaseUrl}/users`);
        const users = await usersResponse.json();
    
        users.forEach((user) => {
          const option = document.createElement("option");
          option.value = user.id;
          option.textContent = user.name;
          commentAuthorSelect.appendChild(option);
        });
    
        // Manejar el envío de comentarios
        commentForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const commentContent = document.getElementById("commentContent").value;
          const commentAuthor = commentAuthorSelect.value;
    
          try {
            const newCommentResponse = await fetch(`${apiBaseUrl}/comments`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                comment: commentContent,
                articleId: parseInt(postId),
                userId: parseInt(commentAuthor),
              }),
            });
    
            const newComment = await newCommentResponse.json();
    
            // Obtener el nombre del autor del comentario
            const userResponse = await fetch(`${apiBaseUrl}/users/${newComment.userId}`);
            const user = await userResponse.json();
    
            // Añadir el nuevo comentario a la lista
            addCommentToList(user.name, newComment.comment);
    
            // Limpiar el formulario
            document.getElementById("commentContent").value = "";
          } catch (error) {
            console.error("Error al agregar el comentario:", error);
          }
        });
      } catch (error) {
        console.error("Error al cargar el post:", error);
      }
  }



// Función para cargar comentarios
async function loadComments(postId) {
  const commentsList = document.getElementById("commentsList");
  // commentsList.innerHTML = ""; // Limpiar lista antes de cargar
  try {
    const commentsResponse = await fetch(`${apiBaseUrl}/comments?articleId=${postId}`);
    const comments = await commentsResponse.json();

    for (const comment of comments) {
      const userResponse = await fetch(`${apiBaseUrl}/users/${comment.userId}`);
      const user = await userResponse.json();
      addCommentToList(user.name, comment.comment);
    }
  } catch (error) {
    console.error("Error al cargar los comentarios:", error);
  }
}

// Función para añadir un comentario a la lista
function addCommentToList(authorName, commentText) {
  const commentsList = document.getElementById("commentsList");
  const commentItem = document.createElement("li");
  commentItem.textContent = `${authorName}: ${commentText}`;
  commentsList.appendChild(commentItem);
}

getPost();