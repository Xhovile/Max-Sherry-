import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { motion } from 'motion/react';
import { QrCode, Download, Printer, Settings, Tag, Palette, Check, RefreshCw, Layers } from 'lucide-react';

export default function AdminQRCodeGenerator() {
  const [tableNumber, setTableNumber] = useState<string>('1');
  const [customLink, setCustomLink] = useState<string>('');
  const [qrColor, setQrColor] = useState<string>('#111111');
  const [qrBgColor, setQrBgColor] = useState<string>('#FFFFFF');
  const [marginSize, setMarginSize] = useState<number>(3);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [labelTemplate, setLabelTemplate] = useState<'none' | 'standard' | 'premium' | 'vintage'>('premium');
  const [qrImage, setQrImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Derive target URL
  const baseAppUrl = window.location.origin + window.location.pathname;
  const computedUrl = customLink.trim() !== '' 
    ? customLink 
    : `${baseAppUrl}?table=${tableNumber || '1'}#menu`;

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(computedUrl, {
        width: 600,
        margin: marginSize,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: qrColor,
          light: qrBgColor
        }
      });
      setQrImage(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode();
    }, 200);
    return () => clearTimeout(timer);
  }, [computedUrl, qrColor, qrBgColor, marginSize, errorCorrection]);

  const downloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement('a');
    link.download = `Culinary_Manifesto_Menu_Table_${tableNumber || 'custom'}.png`;
    link.href = qrImage;
    link.click();
  };

  const printPlacard = () => {
    const cardContent = cardRef.current?.innerHTML;
    if (!cardContent) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>The Culinary Manifesto - Table Placard</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
              body {
                background-color: #ffffff;
                color: #111111;
                font-family: 'Inter', sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
              .placard-container {
                border: 4px solid #D4AF37;
                background-color: #1a1a1a;
                color: #eaeaea;
                padding: 40px;
                text-align: center;
                max-width: 420px;
                width: 100%;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border-radius: 4px;
                box-sizing: border-box;
              }
              .logo-sub {
                font-size: 8px;
                letter-spacing: 4px;
                text-transform: uppercase;
                color: #D4AF37;
                margin-bottom: 5px;
                font-weight: 600;
              }
              .logo-title {
                font-family: 'Playfair Display', serif;
                font-size: 26px;
                font-weight: 700;
                color: #ffffff;
                margin: 0 0 15px 0;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .qr-frame {
                background-color: #ffffff;
                padding: 16px;
                display: inline-block;
                border-radius: 4px;
                box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
                margin: 15px 0;
              }
              .qr-img {
                width: 220px;
                height: 220px;
                display: block;
              }
              .table-badge {
                font-family: 'Playfair Display', serif;
                font-size: 14px;
                font-weight: 600;
                color: #D4AF37;
                border-top: 1px solid rgba(212, 175, 55, 0.3);
                border-bottom: 1px solid rgba(212, 175, 55, 0.3);
                padding: 6px 0;
                margin: 15px auto;
                width: 70%;
                text-transform: uppercase;
                letter-spacing: 1.5px;
              }
              .action-call {
                font-family: 'Playfair Display', serif;
                font-style: italic;
                font-size: 14px;
                color: #eaeaea;
                margin-top: 12px;
                line-height: 1.4;
              }
              .action-detail {
                font-size: 9px;
                color: #888888;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin-top: 5px;
              }
              @media print {
                body {
                  background-color: #ffffff;
                }
                .placard-container {
                  box-shadow: none;
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            <div class="placard-container">
              ${cardContent}
            </div>
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  const presetColors = [
    { name: 'Pitch Black', dark: '#111111', light: '#FFFFFF' },
    { name: 'Imperial Gold', dark: '#111111', light: '#FAF6E9' },
    { name: 'Classic Charcoal', dark: '#242424', light: '#FAFAFA' },
    { name: 'Dramatic Royal', dark: '#1F1202', light: '#FFFFFF' },
    { name: 'Deep Burgundy', dark: '#4A0E17', light: '#FAF8F5' }
  ];

  return (
    <div className="space-y-8 font-sans text-[#B0B0B0]">
      {/* Overview Intro Banner */}
      <div className="bg-[#242424]/30 border border-[#242424] p-8 rounded flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="font-serif text-xl text-[#F5F5F5]">Digital Tabletop QR Curations</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Generate, customize, and print luxury tabletop placards containing precision menu links. Embed table-specific identifiers so your kitchen knows exactly where dishes are ordered from.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={printPlacard}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Printer className="w-4 h-4" /> Print Custom Placard
          </button>
          <button
            type="button"
            onClick={downloadQR}
            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] uppercase tracking-widest font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download QR (PNG)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Options Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Data Routing Details */}
          <div className="bg-[#242424]/30 border border-[#242424] p-6 rounded space-y-4">
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-300 font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#D4AF37]" />
              1. Routing Credentials
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Table Reference</label>
                <input 
                  type="text"
                  placeholder="e.g. 5, Bar-3, VIP"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] focus:border-[#D4AF37] py-2.5 px-3.5 text-xs text-white rounded transition-colors"
                />
              </div>

              <div className="md:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Custom Redirect URL (Optional)</label>
                <input 
                  type="url"
                  placeholder="Leave empty to route directly to this menu view"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] focus:border-[#D4AF37] py-2.5 px-3.5 text-xs text-white rounded transition-colors"
                />
              </div>
            </div>

            <div className="text-[10px] text-neutral-500 bg-[#121212]/40 p-3 rounded border border-neutral-800/50">
              <span className="font-semibold uppercase tracking-wider text-neutral-400 block mb-0.5">Destination Link Target:</span>
              <code className="text-[10px] text-[#D4AF37] break-all font-mono">
                {computedUrl}
              </code>
            </div>
          </div>

          {/* Section 2: Visual Aesthetic Customization */}
          <div className="bg-[#242424]/30 border border-[#242424] p-6 rounded space-y-5">
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-300 font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#D4AF37]" />
              2. Branding & Palette Selection
            </h4>

            {/* Presets Grid */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-semibold block">Designer Color Themes</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {presetColors.map((preset) => {
                  const isCurrent = qrColor === preset.dark && qrBgColor === preset.light;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setQrColor(preset.dark);
                        setQrBgColor(preset.light);
                      }}
                      className={`p-2 bg-[#1A1A1A] border rounded text-left transition-all flex flex-col items-start gap-1 cursor-pointer ${
                        isCurrent ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#242424] hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex space-x-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" style={{ backgroundColor: preset.dark }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" style={{ backgroundColor: preset.light }} />
                      </div>
                      <span className="text-[8.5px] uppercase tracking-wider text-neutral-400 truncate w-full font-medium mt-1">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Custom Module Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 bg-[#1A1A1A] border border-[#242424] rounded p-0.5 cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] text-xs text-white uppercase font-mono px-3 rounded flex-1 focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Custom Background Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-10 h-10 bg-[#1A1A1A] border border-[#242424] rounded p-0.5 cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] text-xs text-white uppercase font-mono px-3 rounded flex-1 focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Fine Printing Options */}
          <div className="bg-[#242424]/30 border border-[#242424] p-6 rounded space-y-4">
            <h4 className="font-serif text-xs uppercase tracking-widest text-neutral-300 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              3. Frame & Template Customization
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Placard Headline Styling</label>
                <select
                  value={labelTemplate}
                  onChange={(e) => setLabelTemplate(e.target.value as any)}
                  className="bg-[#1A1A1A] border border-[#242424] focus:border-[#D4AF37] p-2.5 text-xs text-white rounded cursor-pointer"
                >
                  <option value="none">No Headline (Raw QR Code)</option>
                  <option value="standard">Standard: &quot;Scan to view digital menu&quot;</option>
                  <option value="premium">Royal Gold: &quot;Culinary Manifesto Menu&quot;</option>
                  <option value="vintage">Vintage: &quot;Pre-orders Recommended&quot;</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold">QR Code Padding Margin ({marginSize}px)</label>
                <div className="flex items-center space-x-3 bg-[#1A1A1A] border border-[#242424] px-3.5 py-1 rounded">
                  <input 
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={marginSize}
                    onChange={(e) => setMarginSize(Number(e.target.value))}
                    className="flex-1 accent-[#D4AF37] h-1"
                  />
                  <span className="text-xs text-white font-mono font-bold">{marginSize}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column (Representing Tabletop Placard Design) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start">
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] mb-3">Live Tabletop Placard Preview</span>
          
          {/* Frame Container */}
          <div className="w-full max-w-sm bg-[#111111] border border-[#242424] p-4 rounded shadow-2xl relative">
            <div className="absolute top-3 left-3 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-medium">WYSIWYG Stand</span>
            </div>

            {/* Placard Component content (This will be copied for printing) */}
            <div 
              ref={cardRef}
              className="bg-[#1A1A1A] text-white p-7 text-center rounded border-2 border-[#D4AF37] font-sans"
            >
              <span className="logo-sub">
                The Culinary Manifesto
              </span>
              <h2 className="logo-title">
                Digital Menu
              </h2>

              <p className="text-[10px] text-neutral-400 font-light max-w-[85%] mx-auto leading-relaxed mb-4">
                Please scan the secure code below to instantly browse today&apos;s flame-grilled specialties & fine provisions.
              </p>

              {/* QR Image Frame */}
              <div className="qr-frame bg-white p-4.5 rounded shadow-xl inline-block">
                {isGenerating ? (
                  <div className="w-[180px] h-[180px] flex items-center justify-center bg-white text-neutral-950 font-mono text-[10px]">
                    <RefreshCw className="w-5 h-5 animate-spin mr-1 text-[#D4AF37]" /> Generating...
                  </div>
                ) : (
                  qrImage && (
                    <img 
                      src={qrImage} 
                      alt={`Table ${tableNumber} QR Code`} 
                      className="qr-img w-[180px] h-[180px] object-contain block mx-auto rounded-sm"
                      referrerPolicy="no-referrer"
                    />
                  )
                )}
              </div>

              {/* Table Reference Badge */}
              <div className="table-badge">
                Table Curation No. {tableNumber || '1'}
              </div>

              {/* Frame Label Template */}
              {labelTemplate !== 'none' && (
                <div className="action-call">
                  {labelTemplate === 'standard' && (
                    <>
                      <span>Scan for interactive ordering</span>
                      <div className="action-detail">No app download required</div>
                    </>
                  )}
                  {labelTemplate === 'premium' && (
                    <>
                      <span>Pre-orders Recommended</span>
                      <div className="action-detail">Preserving pristine freshness &amp; craft</div>
                    </>
                  )}
                  {labelTemplate === 'vintage' && (
                    <>
                      <span>Freshly aged cuts await</span>
                      <div className="action-detail">Local Malawian catch &amp; botanicals</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
