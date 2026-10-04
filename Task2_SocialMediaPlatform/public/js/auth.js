// Register
document.getElementById("registerBtn").addEventListener("click", async () => {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all registration fields.");
        return;
    }

    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Now login.");
            
            document.getElementById("registerName").value = "";
            document.getElementById("registerEmail").value = "";
            document.getElementById("registerPassword").value = "";
        } else {
            alert(data.message || "Registration failed.");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});


// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("socialUser", JSON.stringify(data.user));

            alert("Login successful!");

            window.location.href = "/";
        } else {
            alert(data.message || "Login failed.");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});