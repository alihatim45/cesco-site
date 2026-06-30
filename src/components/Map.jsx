import { COMPANY_INFO } from '../utils/constants'

const Map = () => {
  // Google Maps embed URL for PQM3+36, Ar Rawdah, Riyadh
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.042546252315!2d46.763!3d24.760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sPQM3%2B36%20Ar%20Rawdah%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1234567890`

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

