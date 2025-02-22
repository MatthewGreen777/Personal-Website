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
