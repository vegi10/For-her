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

function verifyCode() {

    const input = document.getElementById("access-code");
    const message = document.getElementById("access-message");
    const code = input.value.trim();

    if (!code) {
        message.textContent = "Please enter the code.";
        return;
    }

    message.textContent = "Checking...";

    window.handleAccessResponse = function(result) {

        if (result.success) {

            sessionStorage.setItem(
                "birthday_access",
                "granted"
            );

            document
                .getElementById("access-screen")
                .classList.add("access-hidden");

            message.textContent = "";

        } else if (result.message === "USED") {

            message.textContent =
                "This code has already been used.";

        } else if (result.message === "INVALID") {

            message.textContent =
                "That code isn't correct.";

        } else {

            message.textContent =
                "Something went wrong. Try again.";
        }

        // Remove the temporary script
        const oldScript =
            document.getElementById("access-check-script");

        if (oldScript) {
            oldScript.remove();
        }
    };

    const script = document.createElement("script");

    script.id = "access-check-script";

   script.src =
    ACCESS_API +
    "?code=" +
    encodeURIComponent(code) +
    "&callback=handleAccessResponse";

    document.body.appendChild(script);
}
document.addEventListener("DOMContentLoaded", () => {

    const accessScreen = document.getElementById("access-screen");

    if (!accessScreen) return;

    if (sessionStorage.getItem("birthday_access") === "granted") {
        accessScreen.classList.add("access-hidden");
    }

});
document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("enter-button");

    if (button) {
        button.addEventListener("click", verifyCode);
    }

});
