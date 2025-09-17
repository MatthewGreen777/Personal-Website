document.addEventListener("DOMContentLoaded", function () {
    const siteMap = {
        Home: "/index.html",
        Projects: {
            __link: "/Projects/projects-about.html",
            "Discord Bot": "/Projects/Discord-Bot/discord-bot-about.html",
            "Film": "/Projects/Film/movie-recommender-about.html",
            "Jeopardy": "/Projects/Jeopardy/jeopardy-about.html",
            "Spades": "/Projects/Spades/spades-about.html"
        },
        Education: "/Education/education.html",
        "About Me": "/About-Me/about-me.html",
        Reviews: {
            __link: "/Reviews/reviews-about.html",
            "Movie Reviews": "/Reviews/Movies/movies.html",
            "Game Reviews": "/Reviews/Games/games.html",
            "Music Reviews": "/Reviews/Music/music.html"
        }
    };

    const header = document.querySelector("header");
    if (!header) {
        console.error("Header element not found.");
        return;
    }
    header.innerHTML = `
        <button class="hamburger">&#9776;</button>
        <nav>
            <ul class="nav-menu" id="nav-menu"></ul>
        </nav>
    `;

    const navMenu = document.getElementById("nav-menu");
    if (!navMenu) {
        console.error("Navigation menu element not found.");
        return;
    }

    for (let [key, value] of Object.entries(siteMap)) {
        let li = document.createElement("li");

        if (typeof value === "string") {
            li.innerHTML = `<a href="${value}" class="nav-link">${key}</a>`;
        } else {
            li.classList.add("dropdown");

            const mainLink = value.__link || "#";
            li.innerHTML = `<a href="${mainLink}" class="nav-link dropdown-toggle">${key}</a>`;

            let dropdown = document.createElement("ul");
            dropdown.classList.add("dropdown-menu");

            for (let [subKey, subValue] of Object.entries(value)) {
                if (subKey === "__link") continue;
                const subLi = document.createElement("li");
                subLi.innerHTML = `<a href="${subValue}">${subKey}</a>`;
                dropdown.appendChild(subLi);
            }

            li.appendChild(dropdown);

            // This is the fix: Add a click listener to the dropdown parent
            // to stop propagation and handle clicks correctly.
            li.addEventListener('click', function(e) {
                // Check if the click was on a dropdown link
                const targetLink = e.target.closest('a');
                if (targetLink && targetLink.classList.contains('dropdown-toggle')) {
                    // Prevent the parent link from navigating
                    e.preventDefault();
                } else if (targetLink) {
                    // Let the sub-link navigate normally
                    return;
                }
                // Toggle the active class on the dropdown-menu for display
                this.querySelector('.dropdown-menu').classList.toggle('show');
            });
        }

        navMenu.appendChild(li);
        const divider = document.createElement("li");
        divider.classList.add("divider");
        navMenu.appendChild(divider);
    }
    
    // Hamburger menu logic
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", () => navMenu.classList.toggle("active"));
    }

    // Close menu on outside click
    document.addEventListener("click", (e) => {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
            // Optional: Also hide any open dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
        }
    });

    // Footer Year (if present)
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});