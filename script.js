document.addEventListener("DOMContentLoaded", function () {
    const projectList = document.querySelector(".project-list");
    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");

    const scrollAmount = 150; // Adjust based on project size

    scrollLeftBtn.addEventListener("click", function () {
        projectList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", function () {
        projectList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Toggle the active class when hamburger is clicked
    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close the nav menu if clicked outside
    document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    });
});

document.getElementById("year").textContent = new Date().getFullYear();