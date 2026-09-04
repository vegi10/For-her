const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    document.getElementById("memory").scrollIntoView({
        behavior: "smooth"
    });

});