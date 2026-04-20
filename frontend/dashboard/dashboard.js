const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-modal");
const submitForm = document.getElementById("submit-form");
const saveBookBtn = document.getElementById("add-book");

// submit books
function handleBookSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("name").value;
  const descInput = document.getElementById("description").value;
  const authorInput = document.getElementById("author").value;
  const priceInput = document.getElementById("price").value;

  console.log({
    nameInput,
    descInput,
    authorInput,
    priceInput,
  });
}

// dislay modal
addBookBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveBookBtn.addEventListener("click", handleBookSubmit);
