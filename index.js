// Url
const urlBase = "http://localhost:3000/";


// Obtenemos los elementos necesarios
const tableBody = document.getElementById('postsTable');

// Obtenemos los posts

const fillTable = async () => {
    try {
        const response = await fetch(urlBase + 'articles');
        const posts = await response.json();
        const postWithAuthor = await Promise.all(posts.map(async post => {
            const response = await fetch(`${urlBase}users/${post.autorId}`);
            const author = await response.json();
            return {
                ...post, author: author.name
            }
        }))
        postWithAuthor.forEach(post => {
            const row = document.createElement('tr');

            row.innerHTML = `
        <td>${post.title}</td>
        <td>${post.author}</td>
        <td>
          <a href="post-details.html?id=${post.id}">Ver detalles</a>
        </td>
      `;
            tableBody.appendChild(row);
        });

    } catch (error) {

    }

}

fillTable();








