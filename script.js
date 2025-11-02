const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const bookList = document.getElementById('bookList');

searchBtn.addEventListener('click', () => {
  const query = searchBox.value.trim();
  if (query) {
    fetchBooks(query);
  }
});

async function fetchBooks(query) {
  bookList.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    displayBooks(data.items);
  } catch (error) {
    bookList.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}

function displayBooks(books) {
  if (!books || books.length === 0) {
    bookList.innerHTML = "<p>No books found.</p>";
    return;
  }

  bookList.innerHTML = books.map(book => {
    const info = book.volumeInfo;
    const image = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/150';
    return `
      <div class="book">
        <img src="${image}" alt="${info.title}">
        <h3>${info.title}</h3>
        <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
      </div>
    `;
  }).join('');
}
