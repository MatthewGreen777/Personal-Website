const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    const genreButtonsContainer = document.getElementById('genre-buttons');
    if (genreButtonsContainer) {
        genres.forEach(genre => {
            const button = document.createElement('button');
            button.textContent = genre.name;
            button.onclick = () => getMoviesByGenre(genre.id, genre.name);
            genreButtonsContainer.appendChild(button);
        });
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchMovie();
            }
        });
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove("active");
            }
        });
    }
});

// Function to get a random movie
function getRandomMovie() {
    fetch(`/random`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('selectedMovieDetails', JSON.stringify(data));
            window.location.href = 'result.html';
        })
        .catch(error => console.error('Error getting movies:', error));
}

// Function to get movies by genre
function getMoviesByGenre(genreId, genreName) {
    fetch(`/genre-search?genre=${genreId}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('movieResults', JSON.stringify(data.results));
            localStorage.setItem('selectedGenre', genreName);
            localStorage.setItem('currentPage', 1);
            localStorage.setItem('genreId', genreId);
            window.location.href = 'genre.html';
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to search for a movie
function searchMovie() {
    const query = document.getElementById('search').value;
    fetch(`/title-search?title=${query}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('movieResults', JSON.stringify(data.results));
            window.location.href = 'confirmation.html';
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
}
