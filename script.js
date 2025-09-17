document.addEventListener("DOMContentLoaded", function () {
    // --- Configurable site map ---
    const siteMap = {
        Home: "index.html",
        Projects: {
            __link: "Projects/projects-about.html", // link for main Projects button
            "Discord Bot": "Projects/Discord-Bot/discord-bot-about.html",
            "Film": "Projects/Film/movie-recommender-about.html",
            "Jeopardy": "Projects/Jeopardy/jeopardy-about.html",
            "Spades": "Projects/Spades/spades-about.html"
        },
        Education: "Education/education.html",
        "About Me": "About-Me/about-me.html",
        Reviews: {
            __link: "Reviews/index.html", // main Reviews page
            "Movie Reviews": "Reviews/Movies/movies.html",
            "Game Reviews": "Reviews/Games/games.html",
            "Music Reviews": "Reviews/Music/music.html"
        }
    };

    // --- Generate Navigation ---
    const navMenu = document.getElementById("nav-menu");
    for (let [key, value] of Object.entries(siteMap)) {
        let li = document.createElement("li");

        if (typeof value === "string") {
            // Make sure it always ends in .html
            let safeLink = value.endsWith(".html") ? value : `${value}.html`;
            li.innerHTML = `<a href="${safeLink}" class="nav-link">${key}</a>`;
        } else {
            li.classList.add("dropdown");

            // Parent dropdown link
            let mainLink = value.__link
                ? (value.__link.endsWith(".html") ? value.__link : `${value.__link}.html`)
                : "#";

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

    // --- Generate Projects Section ---
    const projectList = document.getElementById("project-list");
    for (let [project, link] of Object.entries(siteMap.Projects)) {
        if (project === "__link") continue;
        let safeLink = link.endsWith(".html") ? link : `${link}.html`;
        projectList.innerHTML += `<a href="${safeLink}" class="project">${project}</a>`;
    }

    // --- Generate Reviews Section ---
    const reviewList = document.getElementById("review-list");
    for (let [review, link] of Object.entries(siteMap.Reviews)) {
        if (review === "__link") continue;
        let safeLink = link.endsWith(".html") ? link : `${link}.html`;
        reviewList.innerHTML += `<a href="${safeLink}" class="review">${review}</a>`;
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
