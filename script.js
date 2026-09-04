document.addEventListener("DOMContentLoaded", () => {

    // Smooth page transition when clicking links
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        link.addEventListener("click", event => {
            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 450);
        });
    });

    // Fix browser Back / Forward button
    window.addEventListener("pageshow", () => {
        document.body.classList.remove("page-exit");
    });

});
