document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const comments = form.querySelectorAll(".comments");
        comments.forEach(comment => comment.textContent = "");

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Succès : le script Python a été exécuté
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Message envoyé",
                            text: "Merci de m'avoir contacté, je vous répondrai dès que possible",
                        });
                        form.reset(); // Réinitialiser le formulaire
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Script Python exécuté mais erreur",
                            text: "Une erreur est survenue lors de l'envoi du message.",
                        });
                    }
                } else {
                    // Erreur HTTP lors de l'exécution du script Python
                    Swal.fire({
                        icon: "error",
                        title: "Erreur HTTP",
                        text: "Une erreur est survenue lors de l'envoi du message.",
                    });
                }
            }
        };

        let isValid = true;

        if (formData.get('firstname').trim() === "") {
            form.querySelector("#firstname + .comments").textContent = "J'aimerais connaître votre prénom.";
            return;
        }
        if (formData.get('name').trim() === "") {
            form.querySelector("#name + .comments").textContent = "Même le nom svp :)";
            return;
        }
        if (formData.get('email').trim() === "") {
            form.querySelector("#email + .comments").textContent = "Un mail pour vous répondre";
            return;
        }
        if (formData.get('message').trim() === "") {
            form.querySelector("#message + .comments").textContent = "Un petit message pour moi ?";
            return;
        }

       if (isValid) {
           xhr.open("POST", "../../contact.py", true);
           xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
           xhr.send(formData);
        }
    });
});


const aboutPText = "Hello, I'm Mouctar";
const aboutWText = "DevOps Engineer";

function typeTextInLive(elementId, text, typingSpeed) {
    const typingElement = document.getElementById(elementId);

    if (!typingElement) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }

    return new Promise(resolve => {
        typeText();
        setTimeout(resolve, text.length * typingSpeed);
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    await typeTextInLive("aboutP", aboutPText, 30);
    await typeTextInLive("aboutW", aboutWText, 50);
});
