import { showToast } from '@utils/toast';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

export function QrCode({ value }) {
  const qrRef = useRef(null);
  const handleDownloadSVG = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const xmlns = 'http://www.w3.org/2000/svg';
    const originalSize = parseInt(svg.getAttribute('width') || '200', 10);
    const exportSize = 600;
    const scale = exportSize / originalSize;

    const exportSvg = document.createElementNS(xmlns, 'svg');
    exportSvg.setAttribute('xmlns', xmlns);
    exportSvg.setAttribute('width', `${exportSize}px`);
    exportSvg.setAttribute('height', `${exportSize}px`);
    exportSvg.setAttribute('viewBox', `0 0 ${originalSize} ${originalSize}`);
    exportSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const g = document.createElementNS(xmlns, 'g');
    g.setAttribute('transform', `scale(${scale})`);
    Array.from(svg.childNodes).forEach((node) => {
      g.appendChild(node.cloneNode(true));
    });
    exportSvg.appendChild(g);

    const data = new XMLSerializer().serializeToString(exportSvg);
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SharkFlow-qr-code.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleDownloadPNG = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const xmlns = 'http://www.w3.org/2000/svg';
    const originalSize = parseInt(svg.getAttribute('width') || '200', 10);
    const exportSize = 600;
    const scale = exportSize / originalSize;

    const pngSvg = document.createElementNS(xmlns, 'svg');
    pngSvg.setAttribute('xmlns', xmlns);
    pngSvg.setAttribute('width', `${exportSize}px`);
    pngSvg.setAttribute('height', `${exportSize}px`);
    pngSvg.setAttribute('viewBox', `0 0 ${originalSize} ${originalSize}`);
    pngSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const g = document.createElementNS(xmlns, 'g');
    g.setAttribute('transform', `scale(${scale})`);
    Array.from(svg.childNodes).forEach((node) => {
      g.appendChild(node.cloneNode(true));
    });
    pngSvg.appendChild(g);

    const svgData = new XMLSerializer().serializeToString(pngSvg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = exportSize;
      canvas.height = exportSize;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, exportSize, exportSize);

      ctx.drawImage(img, 0, 0, exportSize, exportSize);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const pngUrl = URL.createObjectURL(pngBlob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'SharkFlow-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      showToast('Ошибка при генерации PNG', 'error');
    };
    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={qrRef} className="relative w-[200px] h-[200px] mx-auto">
        <QRCodeSVG
          value={value}
          size={200}
          bgColor="#ffffff"
          fgColor="var(--main-primary)"
          level="H"
          includeMargin={true}
          className="w-full h-full"
        />
        <div className="rounded-full w-14 h-14 flex items-center justify-center absolute top-1/2 left-1/2  bg-white -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xlink="http://www.w3.org/1999/xlink"
            className="w-12 h-12 transform"
            viewBox="9.20199966430664 17.94099998474121 81.58900451660156 64.12199401855469"
          >
            <g fill="#2563eb">
              <path d="M31.73 17.941c-1.395 0-2.871.055-4.43.18 0 0 10.406 5.375 9.625 11.688a55.617 55.617 0 0 0-5.285 2.234c-5.715.414-13.922 2.469-22.438 9.516 0 0 6.117-1.196 11.871-1.578-1.316 1.687-2.273 3.515-2.805 5.492-5.457 20.37 19.762 28.059 31.504 28.059 0 0 4.754 7.054 11.484 8.531-4.195-6.836 2.325-22.145 29.203-31.832 0 0-18.582-2.77-38.719 17.391-3.328 3.332-10.066.98-11.55-4.55-1.184-4.419 2.785-8.419 6.796-9.49 1.504-.401 3.297-.972 5.282-1.675 2.847 2.094 3.402 6.668 3.73 7.898 4.313-2.875 5.426-9.011 5.707-11.64 13.523-5.856 29.086-14.599 29.086-20.087-6.531-3.769-22.203-4.714-37.359-2.378-.969-1.235-6.793-7.75-21.707-7.758zm41.348 9.723v-.004c.77.004 1.395.715 1.395 1.59 0 .879-.626 1.59-1.395 1.593-.367 0-.723-.168-.984-.464a1.72 1.72 0 0 1-.41-1.13c0-.421.148-.824.41-1.124.261-.297.617-.465.984-.465zm-15.449 1.218s-.879 1.239-.879 4.004.879 4.004.879 4.004-1.969-1.36-1.969-4.004c0-2.64 1.969-4.004 1.969-4.004zm-4.504 1.055s-.879 1.238-.879 4.004.88 4.004.88 4.004-1.97-1.36-1.97-4.004c0-2.64 1.97-4.004 1.97-4.004zm-4.504 1.125s-.879 1.238-.879 4.004.88 4.004.88 4.004-1.973-1.36-1.973-4.004c0-2.64 1.972-4.004 1.972-4.004z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownloadSVG}
          className="px-4 py-2 bg-main-primary text-[var(--main-button-text)] bg-[var(--main-button-bg)] hover:bg-[var(--main-button-hover)] rounded-md shadow-md !transition"
        >
          Скачать SVG
        </button>
        <button
          onClick={handleDownloadPNG}
          className="px-4 py-2 bg-main-primary text-[var(--main-button-text)] bg-[var(--main-button-bg)] hover:bg-[var(--main-button-hover)] rounded-md shadow-md !transition"
        >
          Скачать PNG
        </button>
      </div>
    </div>
  );
}
