export default function PdfViewer({ pdfPath, page = 1, title = "Document", className = "" }) {
  if (!pdfPath) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-900/30 ${className}`}
      >
        <svg
          className="w-10 h-10 text-gray-700 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-gray-600 text-sm font-medium">Under Development</p>
      </div>
    );
  }

  const src = `${pdfPath}#page=${page}&toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div className={`w-full h-full bg-gray-900 ${className}`}>
      <iframe
        key={`${pdfPath}-${page}`}
        src={src}
        title={title}
        className="w-full h-full border-0"
        style={{ colorScheme: "normal" }}
      />
    </div>
  );
}
