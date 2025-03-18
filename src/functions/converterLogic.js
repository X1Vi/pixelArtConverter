
export function pixelate(drawfrom, drawto, scale, ctx, palette, customColors) {
    drawto.width = drawfrom.naturalWidth;
    drawto.height = drawfrom.naturalHeight;
    let scaledW = drawto.width * scale;
    let scaledH = drawto.height * scale;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = drawto.width;
    tempCanvas.height = drawto.height;
    tempCanvas.style.visibility = "hidden";
    tempCanvas.style.position = "fixed";
    tempCanvas.style.top = "0";
    tempCanvas.style.left = "0";

    if (drawto.width > 900 || drawto.height > 900) {
        scale *= 0.5;
        scaledW = drawto.width * scale;
        scaledH = drawto.height * scale;
        tempCanvas.width = Math.max(scaledW, scaledH) + 50;
        tempCanvas.height = Math.max(scaledW, scaledH) + 50;
    }

    const tempContext = tempCanvas.getContext("2d");
    tempContext.drawImage(drawfrom, 0, 0, scaledW, scaledH);
    document.body.appendChild(tempCanvas);

    let imageData = tempContext.getImageData(0, 0, scaledW, scaledH);
    applyPalette(imageData, palette, customColors);
    tempContext.putImageData(imageData, 0, 0);

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, 0, 0, drawto.width, drawto.height);
    tempCanvas.remove();
}


export function applyPalette(imageData, palette, customColors) {
    const data = imageData.data;
    
    const palettes = {
        grayscale: null,
        sepia: null,
        inverted: null,
        cyberpunk: [
            [255, 0, 128],   // Hot pink
            [0, 255, 255],   // Cyan
            [255, 255, 0],   // Yellow
            [128, 0, 255],   // Purple
            [0, 255, 128],   // Neon green
            [255, 0, 255],   // Magenta
            [0, 191, 255],   // Deep sky blue
            [255, 106, 0],   // Neon orange
            [173, 216, 230], // Light cyan
            [0, 128, 255]    // Electric blue
        ],
        vaporwave: [
            [255, 153, 255], // Pink
            [153, 102, 255], // Purple
            [102, 204, 255], // Light blue
            [255, 102, 153], // Coral
            [255, 204, 204], // Soft pink
            [186, 85, 211],  // Medium orchid
            [238, 130, 238]  // Violet
        ],
        retro: [
            [0, 0, 0],       // Black
            [255, 0, 0],     // Red
            [0, 255, 0],     // Green
            [0, 0, 255],     // Blue
            [255, 255, 0],   // Yellow
            [255, 0, 255],   // Magenta
            [255, 128, 0],   // Orange
            [0, 255, 255],   // Cyan
            [128, 0, 0],     // Maroon
            [0, 128, 0],     // Dark green
            [128, 128, 0],   // Olive
            [128, 128, 128], // Gray
            [255, 215, 0]    // Gold
        ],
        matrix: [
            [0, 0, 0],      // Black
            [0, 50, 0],     // Dark green
            [0, 100, 0],    // Medium green
            [0, 150, 0],    // Light green
            [0, 200, 0],    // Bright green
            [0, 255, 0],    // Pure green
            [34, 139, 34],  // Forest green
            [144, 238, 144] // Light green
        ],
        funky: [
            [255, 0, 255],   // Magenta
            [255, 255, 0],   // Yellow
            [0, 255, 0],     // Lime green
            [255, 0, 128],   // Hot pink
            [255, 105, 180], // Pink
            [75, 0, 130],    // Indigo
            [148, 0, 211],   // Violet
            [255, 140, 0],   // Dark orange
            [0, 0, 255],     // Blue
            [0, 255, 255]    // Cyan
        ],
        cool: [
            [0, 128, 255],    // Sky blue
            [0, 204, 204],    // Teal
            [102, 153, 255],  // Periwinkle
            [153, 204, 255],  // Light blue
            [51, 51, 153],    // Deep blue
            [176, 224, 230],  // Powder blue
            [72, 209, 204]    // Medium turquoise
        ],
        pop: [
            [255, 0, 0],      // Red
            [255, 255, 0],    // Yellow
            [0, 0, 255],      // Blue
            [255, 0, 255],    // Magenta
            [0, 255, 0],      // Green
            [255, 165, 0],    // Orange
            [0, 255, 255]     // Cyan
        ],
        classic: [
            [139, 69, 19],    // Saddle brown
            [160, 82, 45],    // Sienna
            [210, 180, 140],  // Tan
            [245, 245, 220],  // Beige
            [85, 107, 47],    // Dark olive green
            [128, 128, 128],  // Gray
            [112, 128, 144]   // Slate gray
        ],
        rainy: [
            [105, 105, 105],  // Dim gray
            [112, 128, 144],  // Slate gray
            [70, 130, 180],   // Steel blue
            [176, 196, 222],  // Light steel blue
            [119, 136, 153],  // Light slate gray
            [30, 144, 255],   // Dodger blue
            [47, 79, 79]      // Dark slate gray
        ],
        cheerful: [
            [255, 182, 193],  // Light pink
            [255, 218, 185],  // Peach
            [152, 251, 152],  // Pale green
            [135, 206, 250],  // Light sky blue
            [255, 255, 224],  // Light yellow
            [255, 192, 203],  // Pink
            [255, 165, 0]     // Orange
        ]
    };

    // Process palette type
    const paletteType = palette.toLowerCase();
    const colors = paletteType === 'custom' ? customColors : palettes[paletteType];
    
    // Use specialized functions for certain palette types
    if (paletteType === 'grayscale') {
        applyGrayscale(data);
    } else if (paletteType === 'sepia') {
        applySepia(data);
    } else if (paletteType === 'inverted') {
        applyInverted(data);
    } else if (colors) {
        applyColorPalette(data, colors);
    } else {
        console.warn(`Unknown palette type: ${palette}. No changes applied.`);
    }
    
    return imageData;
}

// Specialized functions to handle different palette types
function applyGrayscale(data) {
    for (let i = 0; i < data.length; i += 4) {
        // Using luminance formula for better grayscale conversion
        const luminance = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
        data[i] = data[i + 1] = data[i + 2] = luminance;
    }
}

function applySepia(data) {
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        
        data[i] = Math.min(255, Math.round(r * 0.393 + g * 0.769 + b * 0.189));
        data[i + 1] = Math.min(255, Math.round(r * 0.349 + g * 0.686 + b * 0.168));
        data[i + 2] = Math.min(255, Math.round(r * 0.272 + g * 0.534 + b * 0.131));
    }
}

function applyInverted(data) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
}

function applyColorPalette(data, colorPalette) {
    if (!colorPalette || colorPalette.length === 0) return;
    
    // Pre-compute brightness values for each palette color
    const paletteWithBrightness = colorPalette.map(color => {
        const brightness = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]);
        return { color, brightness };
    });
    
    for (let i = 0; i < data.length; i += 4) {
        const pixel = [data[i], data[i + 1], data[i + 2]];
        const pixelBrightness = (0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]);
        
        // Find nearest color with brightness factored in
        const nearestColor = findNearestColorWithBrightness(pixel, pixelBrightness, paletteWithBrightness);
        
        data[i] = nearestColor[0];
        data[i + 1] = nearestColor[1];
        data[i + 2] = nearestColor[2];
    }
}

// Helper function to find the nearest color in a palette
function findNearestColor(pixel, palette) {
    let minDistance = Infinity;
    let nearestColor = palette[0];
    
    for (const color of palette) {
        const dr = pixel[0] - color[0];
        const dg = pixel[1] - color[1];
        const db = pixel[2] - color[2];
        
        // Using squared Euclidean distance (faster than computing square root)
        const distance = dr * dr + dg * dg + db * db;
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestColor = color;
        }
    }
    
    return nearestColor;
}

// Advanced color mapping that considers both color and brightness
function findNearestColorWithBrightness(pixel, pixelBrightness, paletteWithBrightness) {
    let minDistance = Infinity;
    let nearestColor = paletteWithBrightness[0].color;
    
    for (const { color, brightness } of paletteWithBrightness) {
        const dr = pixel[0] - color[0];
        const dg = pixel[1] - color[1];
        const db = pixel[2] - color[2];
        
        // Weight color distance more heavily than brightness difference
        const colorDistance = dr * dr + dg * dg + db * db;
        const brightnessDistance = Math.abs(pixelBrightness - brightness);
        
        // Combined distance with brightness weighted at 30%
        const distance = colorDistance * 0.7 + brightnessDistance * 100 * 0.3;
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestColor = color;
        }
    }
    
    return nearestColor;
}

export function parseCustomPalette(paletteStr) {
    if (!paletteStr) return [];
    return paletteStr.split(',').map(hex => {
        const hexColor = hex.trim();
        if (!hexColor.startsWith('#') || hexColor.length !== 7) return [0, 0, 0];
        const bigint = parseInt(hexColor.replace('#', ''), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }).filter(color => color[0] !== 0 || color[1] !== 0 || color[2] !== 0);
}

