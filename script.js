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
const ACCESS_API =
    "https://script.google.com/macros/s/AKfycbw1fOJUWt8A33wbIWp06InQ7vdftXjUuoGtJgKRaVJnZdRlP1uh-pk12azAdQ5GjV_NPA/exec";

async function verifyCode() {

    const input = document.getElementById("access-code");
    const message = document.getElementById("access-message");
    const code = input.value.trim();

    if (!code) {
        message.textContent = "Please enter the code.";
        return;
    }

    message.textContent = "Checking...";

    try {

        const response = await fetch(
            ACCESS_API + "?code=" + encodeURIComponent(code)
        );

        const result = await response.json();

        if (result.success) {

            sessionStorage.setItem("birthday_access", "granted");

            document.getElementById("access-screen").classList.add("access-hidden");

            message.textContent = "";

        } else if (result.message === "USED") {

            message.textContent = "This code has already been used.";

        } else if (result.message === "INVALID") {

            message.textContent = "That code isn't correct.";

        } else {

            message.textContent = "Something went wrong. Try again.";

        }

    } catch (error) {

        message.textContent = "Unable to verify right now.";

    }
}
document.addEventListener("DOMContentLoaded", () => {

    const accessScreen = document.getElementById("access-screen");

    if (!accessScreen) return;

    if (sessionStorage.getItem("birthday_access") === "granted") {
        accessScreen.classList.add("access-hidden");
    }

});
