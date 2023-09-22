import cgi
import json
import smtplib
from email.mime.text import MIMEText


def send_email(subject, message):
    # Remplacez ces valeurs par vos propres informations SMTP
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'moi@gmail.com'
    smtp_password = 'monPass'
    sender_email = 'moi@gmail.com'
    recipient_email = 'moi@gmail.com'

    try:
        # Création du message MIME
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = recipient_email

        # Connexion au serveur SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        # Envoi de l'e-mail
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()

        return True
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'e-mail : {e}")
        return False


def main():
    # Récupérer les données du formulaire
    form = cgi.FieldStorage()

    firstname = form.getvalue('firstname')
    lastname = form.getvalue('name')
    email = form.getvalue('email')
    phone = form.getvalue('phone')
    message = form.getvalue('message')

    # Valider les données (exemple : vérification non vide pour l'e-mail)
    if not firstname or not lastname or not email or not message:
        response = {
            'success': False,
            'message': 'Tous les champs obligatoires doivent être remplis.'
        }
    else:
        # Envoyer l'e-mail
        subject = f"Message de {firstname} {lastname}"
        email_body = f"De : {firstname} {lastname}\nEmail : {email}\nTéléphone : {phone}\n\n{message}"

        if send_email(subject, email_body):
            response = {
                'success': True,
                'message': 'L\'e-mail a été envoyé avec succès.'
            }
        else:
            response = {
                'success': False,
                'message': 'Une erreur est survenue lors de l\'envoi de l\'e-mail.'
            }

    # Envoyer la réponse JSON
    print("Content-Type: application/json")
    print()
    print(json.dumps(response))


if __name__ == '__main__':
    main()
