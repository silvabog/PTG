const apiUrl = "http://localhost:5000"; 
let authToken = "";

// Register User
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

// Login User
document.getElementById("loginForm").addEventListener("submit", async (event) => {
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
    } else {
        document.getElementById("loginMessage").innerText = data.message || "Login failed";
    }
});

// Add a Book
document.getElementById("addBookForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const course_relevance = document.getElementById("bookCourse").value;
    const condition = document.getElementById("bookCondition").value;
    const description = document.getElementById("bookDescription").value;

    const response = await fetch(`${apiUrl}/books`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ title, author, course_relevance, condition, description }),
    });

    const data = await response.json();
    document.getElementById("bookMessage").innerText = data.message || "Book addition failed";
});

// Fetch Books
async function fetchBooks() {
    const response = await fetch(`${apiUrl}/books`);
    const books = await response.json();
    
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerText = `${book.title} by ${book.author} - ${book.condition}`;
        bookList.appendChild(li);
    });
}
