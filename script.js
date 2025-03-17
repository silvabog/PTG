const apiUrl = "http://localhost:5000"; 
let authToken = "";

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

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const first_name = document.getElementById("regFirstName").value;
    const last_name = document.getElementById("regLastName").value;

    const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, first_name, last_name }),
    });

    const data = await response.json();
    document.getElementById("registerMessage").innerText = data.message || "Registration failed";
});