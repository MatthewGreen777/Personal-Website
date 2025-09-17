document.addEventListener("DOMContentLoaded", function () {
    // --- Configurable site map ---
    const siteMap = {
        Home: "/index.html",
        Projects: {
            __link: "/Projects/projects-about.html",
            "Discord Bot": "/Projects/Discord-Bot/discord-bot.html",
            "Film": "/Projects/Film/movie-recommender-about.html",
            "Jeopardy": "/Projects/Jeopardy/jeopardy-about.html",
            "Spades": "/Projects/Spades/spades-about.html"
        },
        Education: "/Education/education.html",
        "About Me": "/About-Me/about-me.html",
        Reviews: {
            __link: "/Reviews/index.html",
            "Movie Reviews": "/Reviews/Movies/movies.html",
            "Game Reviews": "/Reviews/Games/games.html",
            "Music Reviews": "/Reviews/Music/music.html"
        }
    };

    // --- Insert Navigation ---
    const header = document.querySelector("header");
    header.innerHTML = `
        <button class="hamburger">&#9776;</button>
        <nav>
            <ul class="nav-menu" id="nav-menu"></ul>
        </nav>
    `;

    const navMenu = document.getElementById("nav-menu");

    for (let [key, value] of Object.entries(siteMap)) {
        let li = document.createElement("li");

        if (typeof value === "string") {
            // Ensure all direct links end with .html
            let safeLink = value.endsWith(".html") ? value : `${value}.html`;
            li.innerHTML = `<a href="${safeLink}" class="nav-link">${key}</a>`;
        } else {
            li.classList.add("dropdown");

            // Parent dropdown link
            let mainLink = value.__link && value.__link.endsWith(".html")
                ? value.__link
                : (value.__link || "#");

            li.innerHTML = `<a href="${mainLink}" class="nav-link">${key}</a>`;

            // Dropdown items
            let dropdown = document.createElement("ul");
            dropdown.classList.add("dropdown-menu");

            for (let [subKey, subValue] of Object.entries(value)) {
                if (subKey === "__link") continue;

                let safeLink = subValue.endsWith(".html") ? subValue : `${subValue}.html`;
                dropdown.innerHTML += `<li><a href="${safeLink}">${subKey}</a></li>`;
            }

            li.appendChild(dropdown);
        }

        navMenu.appendChild(li);
        navMenu.innerHTML += `<li class="divider"></li>`;
    }

    // --- Mobile Nav ---
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => navMenu.classList.toggle("active"));

    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    });

    // --- Footer Year (if present) ---
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
