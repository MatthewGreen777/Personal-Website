document.addEventListener("DOMContentLoaded", function () {
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
});
