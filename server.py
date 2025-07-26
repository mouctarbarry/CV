import http.server
import socketserver
import ssl
import os
import json
import urllib.parse
import smtplib
from email.mime.text import MIMEText

PORT = int(os.environ.get("PORT", 8000))


def send_email(subject, message):
    # Email configuration (same as contact.py)
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'moi@gmail.com'
    smtp_password = 'monPass'
    sender_email = 'moi@gmail.com'
    recipient_email = 'moi@gmail.com'

    try:
        # Create MIME message
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = recipient_email

        # Connect to SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        # Send email
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()

        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/contact':
            self.handle_contact_form()
        else:
            self.send_error(404, "Not Found")
    
    def handle_contact_form(self):
        try:
            # Read the form data
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse form data
            form_data = urllib.parse.parse_qs(post_data.decode('utf-8'))
            
            # Extract form fields
            firstname = form_data.get('firstname', [''])[0].strip()
            lastname = form_data.get('name', [''])[0].strip()
            email = form_data.get('email', [''])[0].strip()
            phone = form_data.get('phone', [''])[0].strip()
            message = form_data.get('message', [''])[0].strip()
            
            # Validate required fields
            if not firstname or not lastname or not email or not message:
                response = {
                    'success': False,
                    'message': 'Tous les champs obligatoires doivent être remplis.'
                }
            else:
                # Send email
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
            
            # Send JSON response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            print(f"Error handling contact form: {e}")
            self.send_error(500, "Internal Server Error")


httpd = socketserver.TCPServer(("", PORT), MyRequestHandler)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile="server.crt", keyfile="server.key")

httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"Serving at port {PORT}")
httpd.serve_forever()
