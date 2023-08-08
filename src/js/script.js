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
