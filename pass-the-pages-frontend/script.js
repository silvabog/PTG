const apiUrl = "http://localhost:5000"; 
let authToken = "";

// Function to handle book listing
function displayBooks() {
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
}

// Login User
document.getElementById("loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
        authToken = data.token;
        document.getElementById("loginMessage").innerText = "Login Successful!";
        window.location.href = "index.html";
    } else {
        document.getElementById("loginMessage").innerText = data.message || "Login failed";
    }
});

// Register User
document.getElementById("registerForm")?.addEventListener("submit", async (event) => {
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

// Fetch Navbar HTML and Initialize Materialize Components
document.addEventListener("DOMContentLoaded", function () {
    // Load navbar dynamically
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-container").innerHTML = data;

        // Initialize Sidenav and Dropdown
        var elemsSidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elemsSidenav);

        var dropdownElems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdownElems, {
          hover: true, // Ensure hover functionality
          alignment: 'right', // Align dropdown to the right
          coverTrigger: false, // Ensure proper dropdown alignment
        });
      });

    // Display book list (static example books for now)
    displayBooks();
});

