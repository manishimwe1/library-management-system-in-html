const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-modal");

addBookBtn.addEventListener('click',()=>{
    modal.style.display = 'flex';
})

closeBtn.addEventListener('click',()=>{
    modal.style.display = 'none';
})