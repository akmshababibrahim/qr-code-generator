const userInput = document.querySelector("input");
const display = document.querySelector(".qr-code");
const download = document.querySelector("button");
let timeout;

// Function to update screen dimensions
function updateScreenDimensions() {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (displayWidth <= 932 && displayHeight <= 430) {
        return { width: 250, height: 200 };
    } else {
        return { width: 400, height: 400 };
    }
}

// Add resize event listener once
window.addEventListener("resize", function() {
    // Update QR code when the window is resized
    if (userInput.value) {
        generateQRCode();
    }
});

function generateQRCode() {
    const { width, height } = updateScreenDimensions();

    // Clear previous QR code
    display.innerHTML = "";

    const properties = {
        text: userInput.value,
        width: width,
        height: height
    };

    // Ensure QRCode constructor is properly defined and imported
    const qrcode = new QRCode(display, properties);
}

userInput.addEventListener("input", function() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        generateQRCode();
    }, 500);
});

download.addEventListener("click", function() {
    if (userInput.value !== "") {
        html2canvas(display).then(function(canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL(); // Convert canvas to image
            link.download = `${userInput.value}.png`; // Set download filename
            link.click(); // Trigger download
        });
    }
});