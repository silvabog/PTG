document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.querySelector(".book-list");

    const books = [
        { title: "Intro to Python", author: "John Doe", price: "$20" },
        { title: "Business 101", author: "Jane Smith", price: "$15" },
        { title: "Marketing Strategies", author: "Mike Johnson", price: "$18" }
    ];

    books.forEach(book => {
        let bookCard = document.createElement("div");
        bookCard.innerHTML = `
            <h4>${book.title}</h4>
            <p>by ${book.author}</p>
            <p>Price: ${book.price}</p>
        `;
        bookCard.classList.add("book-card");
        bookList.appendChild(bookCard);
    });
});
