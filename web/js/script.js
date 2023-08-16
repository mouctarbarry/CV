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


function typeTextInLive(elementId, typingSpeed) {
    const typingElement = document.getElementById(elementId);
    const text = typingElement.getAttribute("data-text");
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }

    typeText();
}

typeTextInLive("aboutP", 50);
typeTextInLive("aboutW", 50);
