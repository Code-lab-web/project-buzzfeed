// JavaScript for keyboard navigation
Element.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
        case ' ':
            // Activate the element
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            // Move to next item
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            // Move to previous item
            break;
        case 'Home':
            // Move to first item
            break;
        case 'End':
            // Move to last item
            break;
    }
});

// Focus Management

// After form submission
submitButton.addEventListener('click', () => {
    // Hide form
    FormData.hidden = true;

    // Show results
    SpeechRecognitionResultList.hidden = false;

    // Set focus to results
    SpeechRecognitionResultList.setAttribute('tabindex', '-1');
    SpeechRecognitionResultList.focus();

    // Announce to screen readers
    announcer.textContent = 'Form submitted successfully';
});