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
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("isLoggedIn", "true");
        document.getElementById("loginMessage").innerText = "Login Successful!";

        // Redirect with a slight delay to ensure storage is set
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    } else {
        document.getElementById("loginMessage").innerText = data.message || "Login failed";
    }
});

// Logout function
function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

// Update Navbar based on authentication status
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

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
          hover: true,
          alignment: 'right',
          coverTrigger: false,
        });

        // Show/Hide navbar links based on authentication status
        if (isLoggedIn) {
            document.getElementById("login-link").style.display = "none";
            document.getElementById("signup-link").style.display = "none";
            document.getElementById("logout-link").style.display = "block";
        }
      });

    // Display book list
    displayBooks();
});

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