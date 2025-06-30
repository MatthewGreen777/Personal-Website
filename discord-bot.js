document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
        }
    });

    // Toggle command dropdowns and arrow
    document.querySelectorAll('.toggle-dropdown').forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            if (dropdown && dropdown.classList.contains('command-dropdown-menu')) {
                dropdown.classList.toggle('show');
                button.classList.toggle('open');  // Toggle arrow direction
            }
        });
    });

    document.getElementById("year").textContent = new Date().getFullYear();
    
});
