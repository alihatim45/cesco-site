import { COMPANY_INFO } from '../utils/constants'

const Map = () => {
  // Google Maps embed URL for PQM3+36, Ar Rawdah, Riyadh
  const mapUrl = 'https://www.google.com/maps?q=PQM3%2B36%20Ar%20Rawdah%2C%20Riyadh&output=embed'

  return (
    <div className="w-full">
      <div className="map-container w-full rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location"
        />
      </div>
      <p className="mt-4 text-gray-700 text-center rtl:text-right ltr:text-left">
        <strong>{COMPANY_INFO.address}</strong>
      </p>
    </div>
  )
}

export default Map

