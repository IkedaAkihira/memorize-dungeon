const separateCanvas = document.createElement("canvas");

function separateImages(baseImage, columns, rows, resultWidth, resultHeight, baseWidth, baseHeight) {
    separateCanvas.width = resultWidth;
    separateCanvas.height = resultHeight;
    const ctx = separateCanvas.getContext("2d");
    const images = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            ctx.clearRect(0, 0, resultWidth, resultHeight);
            ctx.drawImage(baseImage, column * baseWidth, row * baseHeight, baseWidth, baseHeight, 0, 0, resultWidth, resultHeight);
            const image = new Image();
            image.src = separateCanvas.toDataURL();
            images.push(image);
        }
    }
    return images;
}