const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-modal");
const submitForm = document.getElementById("submit-form");
const saveBookBtn = document.getElementById("add-book");

// global variable 

let deletingBook = false;

// submit books
async function handleBookSubmit(e) {
  e.preventDefault();
  submitForm.disabled = true;
  const nameInput = document.getElementById("name").value;
  const descInput = document.getElementById("description").value;
  const authorInput = document.getElementById("author").value;
  const priceInput = document.getElementById("price").value;
  const imageInput = document.getElementById("imageSrc");

  const file = imageInput.files[0];
  
  if (!file) {
    console.log("No file selected");
    return;
  }

  const reader = new FileReader();
  
  reader.onerror = function() {
    console.log("Error reading file:", reader.error);
  };

  reader.onload = async function() {
    const imageSrc = reader.result; // Base64 data URL
    console.log("Image converted to Base64, length:", imageSrc.length);
    
    if (!imageSrc) {
      console.log("Error: imageSrc is null or empty");
      return;
    }

    try {
      const endPoint = 'http://localhost:3000';
      const addNewBooks = await fetch(`${endPoint}/api/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          description: descInput,
          author: authorInput,
          price: priceInput,
          image: imageSrc, // Base64 data URL
        }),
      });
      const result = await addNewBooks.json();
      console.log("Book added successfully:", result);
      
      if (result.success) {
        // Clear form
        submitForm.reset();
        modal.style.display = "none";
        displayBooks(); // Refresh the books table
      }
      
    } catch (error) {
      console.log("Error adding book:", error);
    }finally{
      addingBook = false;
    }
  };
  
  reader.readAsDataURL(file);
  console.log('File selected:', file.name);
}

function displayBooks(){
  const endPoint = 'http://localhost:3000'; 
  fetch(`${endPoint}/api/books`)
    .then(response => response.json())
    .then(result => {
      const books = result.data;
      console.log(books);
      const tbody = document.getElementById('books-tbody');
      tbody.innerHTML = ''; // Clear existing rows
      
      if (!books || books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No books found</td></tr>';
        return;
      }
      
      books.forEach((book) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${book.imageSrc}" alt="${book.title}" class="book-thumbnail" /></td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.description.substring(0, 50)}...</td>
          <td>$${book.price}</td>
          <td>
            <button class="btn-edit" onclick="editBook('${book._id}')">Edit</button>
            <button class="btn-delete" onclick="deleteBook('${book._id}')">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => console.log("Error fetching books:", error));
}

function deleteBook(bookId) {
  deletingBook = true;
  if (confirm("Are you sure you want to delete this book?")) {
    const endPoint = 'http://localhost:3000';
    fetch(`${endPoint}/api/book/${bookId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => {
        console.log("Book deleted:", result);
        displayBooks(); // Refresh the table
      })
      .catch(error => console.log("Error deleting book:", error))
      .finally(() => {
        deletingBook = false;
      });
  }
}

function editBook(bookId) {
  console.log("Edit book:", bookId);
  // TODO: Implement edit functionality
  alert("Edit functionality coming soon!");
}  

if (deletingBook) {
  console.log("Currently deleting a book, please wait...");

}


// dislay modal
addBookBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

submitForm.addEventListener("submit", handleBookSubmit);

// Load books when page loads
document.addEventListener('DOMContentLoaded', displayBooks);
