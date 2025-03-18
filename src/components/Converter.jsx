import React, { useRef, useState, useEffect } from 'react';
import { pixelate, parseCustomPalette } from "../functions/converterLogic";
function Converter() {
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(0.1);
    const [palette, setPalette] = useState('default');
    const [customPalette, setCustomPalette] = useState('');
    const [image, setImage] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // Terminal theme colors
    const terminalTheme = {
        background: '#1E1E1E',
        text: '#00FF00',
        accent: '#39FF14',
        secondary: '#4E4E4E',
        border: '#565656',
        success: '#2ECC71',
        warning: '#FF6B6B'
    };

    useEffect(() => {
        if (image) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            pixelate(image, canvas, scale, ctx, palette, parseCustomPalette(customPalette));
        }
    }, [scale, palette, customPalette, image]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                setImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    setImage(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadCanvasImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'pixelated-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: terminalTheme.background,
            color: terminalTheme.text,
            fontFamily: 'monospace',
            maxWidth: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1 style={{
                color: terminalTheme.accent,
                textShadow: '0 0 5px rgba(57, 255, 20, 0.5)',
                margin: '20px 0'
            }}>X1VI PIXELATOR</h1>

            <div style={{
                border: `2px dashed ${dragActive ? terminalTheme.accent : terminalTheme.border}`,
                borderRadius: '4px',
                padding: '30px',
                margin: '20px 0',
                width: '80%',
                maxWidth: '500px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: dragActive ? 'rgba(57, 255, 20, 0.1)' : 'transparent'
            }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}>
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: terminalTheme.accent }}>$</span> DROP IMAGE HERE OR CLICK TO UPLOAD
                    </div>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </label>
            </div>

            <div style={{ width: '80%', maxWidth: '500px', margin: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px', minWidth: '120px', textAlign: 'left' }}>
                        <span style={{ color: terminalTheme.accent }}>$</span> PIXEL SIZE:
                    </label>
                    <input
                        type="range"
                        min="0.01"
                        max="1"
                        step="0.01"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        style={{
                            flex: 1,
                            accentColor: terminalTheme.accent,
                            backgroundColor: terminalTheme.secondary
                        }}
                    />
                    <span style={{ marginLeft: '10px', minWidth: '40px' }}>{scale.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px', minWidth: '120px', textAlign: 'left' }}>
                        <span style={{ color: terminalTheme.accent }}>$</span> COLOR PALETTE:
                    </label>
                    <select
                        value={palette}
                        onChange={(e) => setPalette(e.target.value)}
                        style={{
                            flex: 1,
                            backgroundColor: terminalTheme.secondary,
                            color: terminalTheme.text,
                            padding: '5px',
                            border: `1px solid ${terminalTheme.border}`,
                            borderRadius: '3px',
                            fontFamily: 'monospace'
                        }}
                    >
                        <option value="default">DEFAULT</option>
                        <option value="grayscale">GRAYSCALE</option>
                        <option value="sepia">SEPIA</option>
                        <option value="inverted">INVERTED</option>
                        <option value="cyberpunk">CYBERPUNK</option>
                        <option value="vaporwave">VAPORWAVE</option>
                        <option value="retro">RETRO GAMING</option>
                        <option value="matrix">MATRIX</option>
                        <option value="funky">FUNKY</option>
                        <option value="cool">COOL</option>
                        <option value="pop">POP</option>
                        <option value="classic">CLASSIC</option>
                        <option value="rainy">RAINY</option>
                        <option value="gloomy">GLOOMY</option>
                        <option value="sad">SAD</option>
                        <option value="happy">HAPPY</option>
                        <option value="sunset">SUNSET</option>
                        <option value="cheerful">CHEERFUL</option>
                        <option value="custom">CUSTOM</option>
                    </select>
                </div>

                {palette === 'custom' && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px', minWidth: '120px', textAlign: 'left' }}>
                            <span style={{ color: terminalTheme.accent }}>$</span> HEX COLORS:
                        </label>
                        <input
                            type="text"
                            value={customPalette}
                            onChange={(e) => setCustomPalette(e.target.value)}
                            placeholder="#ff0000,#00ff00,#0000ff"
                            style={{
                                flex: 1,
                                backgroundColor: terminalTheme.secondary,
                                color: terminalTheme.text,
                                padding: '5px',
                                border: `1px solid ${terminalTheme.border}`,
                                borderRadius: '3px',
                                fontFamily: 'monospace'
                            }}
                        />
                    </div>
                )}
            </div>

            <div style={{
                width: '100%',
                maxWidth: '800px',
                margin: '20px auto',
                overflow: 'auto'
            }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        border: `2px solid ${terminalTheme.border}`,
                        borderRadius: '4px',
                        maxWidth: '100%',
                        height: 'auto',
                        boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
                    }}
                ></canvas>
            </div>

            <button
                onClick={downloadCanvasImage}
                disabled={!image}
                style={{
                    backgroundColor: image ? terminalTheme.accent : terminalTheme.secondary,
                    color: image ? '#000' : terminalTheme.text,
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    cursor: image ? 'pointer' : 'not-allowed',
                    marginTop: '20px',
                    transition: 'all 0.3s ease'
                }}
            >
                $ DOWNLOAD PIXELATED IMAGE
            </button>

            <div style={{
                marginTop: '20px',
                color: terminalTheme.text,
                fontSize: '12px',
                opacity: 0.7
            }}>
                &lt;PIXELATOR v0.0.1&gt;
            </div>
        </div>
    );
}


export default Converter;