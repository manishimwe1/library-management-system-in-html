
const bookContainer = document.getElementById('book-container');
const navLink = document.getElementById('navLink');


const books = [
    {
        id: 1,
        name:'Javascript for beginners',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
        author:'John Doe',
        price: 20,
        slug:'javascript-for-beginners',
         image:'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
    },
    {
        id: 2,
        name:'Html for beginners',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
        author:'manzi Doe',
        price: 40,
        slug:'html-for-beginners',
        image:'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
    },
    {
        id: 3,
        name:'React for beginners',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
        author:'John Man',
        price: 20,
        slug:'react-for-beginners',
        image:'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
    },
    {
        id: 4,
        name:'css for beginners',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
        author:'John Doe',
        price: 20,
        slug:'css-for-beginners',
        image:'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
    },
    {
        id: 5,
        name:'Job for beginners',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.',
        author:'John Doe',
        price: 20,
        slug:'job-for-beginners',
        image:'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
    },
]

const navLinks = [
    {
        label:'Home',
        active: true,
        link:'/'

    },
    {
        label:'Dashboard',
        active: false,
        link:'/dashboard'

    },
    {
        label:'Books',
        active: false,
        link:'/books'

    },
    {
        label:'Add books',
        active: false,
        link:'/books'

    }
]


function displayBooks(){

    books.map((book)=>{
        
        const bookElement = document.createElement('div');

        const bookImage = document.createElement('img');
        const bookName = document.createElement('h2');
        const bookAuthor = document.createElement('p');
        const bookDescription = document.createElement('p');
        const bookPrice = document.createElement('p');
        
        bookImage.src = book.image;
        bookName.textContent = book.name;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookDescription.textContent = book.description;
        bookPrice.textContent = `Price: $${book.price.toFixed(2)}`;

        bookElement.className = 'book-element';
        bookName.className = 'book-title';
        bookAuthor.className = 'book-author';
        bookDescription.className = 'book-desc';
        bookPrice.className = 'book-price';
        bookImage.className = 'bookImage'

        bookElement.appendChild(bookImage);
        bookElement.appendChild(bookName);
        bookElement.appendChild(bookAuthor);
        bookElement.appendChild(bookDescription);
        bookElement.appendChild(bookPrice);

        bookContainer.appendChild(bookElement);

    })
}

function displayNavLinks(){
    navLinks.map((link,i)=>{
        const navLinkElement = document.createElement('li');
        const navLinkHref= document.createElement('a')

        navLinkHref.innerText = `${link.label}`
        navLinkHref.href = `${link.link}`
        navLinkElement.className = 'nav-link'
        navLinkElement.appendChild(navLinkHref)
        navLink.appendChild(navLinkElement)
    })
}

displayBooks()

displayNavLinks()