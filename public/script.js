// Constants
const MESSAGE_TIME = 5000
const OPACITY_RATE = 0.05

/**
 * Fade out element before removing from DOM
 * 
 * @param {HTMLElement} element the element to fade out
 */
function fadeOut(element) {
    // Initialize element opacity
    element.style.opacity = 1

    /**
     * Update opacity per animation frame
     */
    function fadeAnimFrame() {
        // Get current animation frame
        let opacity = parseFloat(element.style.opacity)

        // Remove element if opacity is completely 0
        // Otherwise lower opacity
        if (opacity <= 0) {
            element.parentElement.removeChild(element)
        }
        else {
            opacity -= OPACITY_RATE
            element.style.opacity = opacity.toString()
            requestAnimationFrame(fadeAnimFrame)
        }
    }

    // Start animation routine
    requestAnimationFrame(fadeAnimFrame)
}

/**
 * Run when content is loaded
 */
document.addEventListener('DOMContentLoaded', function() {

    // Initialize stripe
    let stripe = Stripe('pk_test_51HWUeTDILRu927RJ4PFHGFprSVnRyavPytyr2rmXbxUeiWShoVASh3uTtKFlNpX1MkyruIX3ZnGCXnKIh7qCD7sh00bMrwzhYU')

    // Hook up dismissable messages
    let closeButton
    for (const message of document.getElementsByClassName('message')) {
        // Hook up close button
        closeButton = message.getElementsByClassName('close')[0]
        closeButton.addEventListener('click', function() { fadeOut(message) })

        // Hook up automatic dismiss
        if (MESSAGE_TIME) {
            setTimeout(function() { fadeOut(message) }, MESSAGE_TIME )
        }
    }

    // Handle checkout click
    let checkoutButton = document.getElementById('stripe-checkout')
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            fetch('/create-checkout-session', { method: 'POST' })
                .then(resp => resp.json())
                .then(session => stripe.redirectToCheckout({ sessionId: session.id }))
                .then(function (result) {
                    // If redirectToCheckout fails due to a browser or network
                    // error, you should display the localized error message to your
                    // customer using error.message.
                    if (result.error) {
                        alert(result.error.message);
                    }
                })
                .catch(function (error) {
                    console.error("Error:", error);
                });
        })
    }
})