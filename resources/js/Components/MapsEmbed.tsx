interface MapsEmbedProps {
  embedUrl: string;
  venueName: string;
  address: string;
}

export default function MapsEmbed({ embedUrl, venueName, address }: MapsEmbedProps) {
  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{venueName}</h3>
        <p className="text-gray-600">{address}</p>
      </div>
      
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map to ${venueName}`}
        />
      </div>
      
      <div className="mt-4 text-center">
        <a
        
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}