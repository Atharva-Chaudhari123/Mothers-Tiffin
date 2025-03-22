document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".auth-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const phone = document.getElementById("phone").value.trim();


        const requestBody = {
            name,
            username,
            email,
            password,
            phone,

        };

        try {
            const response = await fetch("http://localhost:3000/api/clients/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            let data;
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            } else {
                data = { message: "No JSON response from server" };
            }

            if (response.ok) {
                alert("Signup successful! Redirecting to login page...");
                window.location.href = "client-login.html";
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
});
