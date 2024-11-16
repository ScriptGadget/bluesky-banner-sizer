document.getElementById('imageInput').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const squareSize = 1500;
            canvas.width = squareSize;
            canvas.height = squareSize;

            // Clear the canvas and fill it with black
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, squareSize, squareSize);

            // Calculate the scaled size of the image
            const aspectRatio = img.height / img.width;
            const newWidth = 1500;
            const newHeight = newWidth * aspectRatio;

            // Center the image on the canvas
            const x = (squareSize - newWidth) / 2;
            const y = (squareSize - newHeight) / 2;

            // Draw the image on the canvas
            ctx.drawImage(img, x, y, newWidth, newHeight);

            // Enable the download button
            const downloadButton = document.getElementById('downloadButton');
            downloadButton.disabled = false;
            downloadButton.addEventListener('click', function () {
                const link = document.createElement('a');
                link.download = 'result.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
