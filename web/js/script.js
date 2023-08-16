$(document).ready(function () {
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        // Effacer les messages d'erreur précédents
        $('.comments').empty();

        // Récupérer les données du formulaire
        const formData = $(this).serialize();

        // Envoyer les données au serveur via AJAX
        $.ajax({
            type: 'POST',
            url: 'php/contact.php',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.isSuccess) {
                    // Afficher un message de succès
                    Swal.fire({
                        icon: 'success',
                        title: 'Succès',
                        html: 'Votre message a bien été envoyé. <br> Merci de m\'avoir contacté &#128522;',
                    }).then((result) => {
                        // Réinitialiser le formulaire si l'utilisateur clique sur "OK"
                        if (result.isConfirmed) {
                            $('#contact-form')[0].reset();
                        }
                    });

                } else {
                    // Afficher les messages d'erreur à côté des champs concernés
                    $('#firstname + .comments').html(response.firstnameError);
                    $('#name + .comments').html(response.nameError);
                    $('#email + .comments').html(response.emailError);
                    $('#phone + .comments').html(response.phoneError);
                    $('#message + .comments').html(response.messageError);
                }
            }
        });
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
