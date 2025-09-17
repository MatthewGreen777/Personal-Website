document.addEventListener("DOMContentLoaded", function () {
    // --- Configurable site map ---
    const siteMap = {
        Home: "/index.html",
        Projects: {
            __link: "/Projects/projects-about.html",
            "Discord Bot": "/Projects/Discord-Bot/discord-bot-about.html",
            "Film": "/Projects/Film/movie-recommender-about.html",
            "Jeopardy": "/Projects/Jeopardy/jeopardy-about.html",
            "Spades": "/Projects/Spades/spades-about.html"
        },
        Reviews: {
            __link: "/Reviews/reviews-about.html",
            "Movie Reviews": "/Reviews/Movies/movies.html",
            "Game Reviews": "/Reviews/Games/games.html",
            "Music Reviews": "/Reviews/Music/music.html"
        },
        Education: "/Education/education.html",
        "About Me": "/About-Me/about-me.html",

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
            li.innerHTML = `<a href="${value}" class="nav-link">${key}</a>`;
        } else {
            li.classList.add("dropdown");

            // CHANGE: Make the parent link a non-navigable toggle
            let mainLink = value.__link || "#";
            li.innerHTML = `<a href="javascript:void(0)" class="nav-link dropdown-toggle">${key}</a>`;

            // Dropdown items
            let dropdown = document.createElement("ul");
            dropdown.classList.add("dropdown-menu");

            for (let [subKey, subValue] of Object.entries(value)) {
                if (subKey === "__link") continue;
                dropdown.innerHTML += `<li><a href="${subValue}">${subKey}</a></li>`;
            }

            li.appendChild(dropdown);
        }

        navMenu.appendChild(li);
        navMenu.innerHTML += `<li class="divider"></li>`;
    }

    // --- Scroll Function (with looping) ---
    function setupCarousel(listId, leftBtnId, rightBtnId) {
        const list = document.getElementById(listId);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);
        const scrollAmount = 150;

        rightBtn.addEventListener("click", () => {
            if (list.scrollLeft + list.clientWidth >= list.scrollWidth) {
                list.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                list.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });

        leftBtn.addEventListener("click", () => {
            if (list.scrollLeft <= 0) {
                list.scrollTo({ left: list.scrollWidth, behavior: "smooth" });
            } else {
                list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            }
        });
    }

    setupCarousel("project-list", "project-left", "project-right");
    setupCarousel("review-list", "review-left", "review-right");

    // --- Mobile Nav ---
    const hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => navMenu.classList.toggle("active"));

    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    });

    // --- Footer Year ---
    document.getElementById("year").textContent = new Date().getFullYear();
});
