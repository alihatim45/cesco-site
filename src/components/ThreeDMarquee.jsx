import './three-d-marquee.css'

export default function ThreeDMarquee({ images, className = '' }) {
  const columns = Array.from({ length: 4 }, (_, columnIndex) =>
    images.filter((_, imageIndex) => imageIndex % 4 === columnIndex),
  )

  return (
    <div className={`cesco-3d-marquee ${className}`} aria-hidden="true">
      <div className="cesco-3d-marquee-scene">
        <div className="cesco-3d-marquee-grid">
          {columns.map((column, columnIndex) => {
            const repeated = [...column, ...column]
            return (
              <div className={`cesco-3d-marquee-column is-column-${columnIndex + 1}`} key={columnIndex}>
                <div className="cesco-3d-marquee-track">
                  {repeated.map((src, imageIndex) => (
                    <figure className="cesco-3d-marquee-tile" key={`${src}-${imageIndex}`}>
                      <img
                        src={src}
                        alt=""
                        loading={columnIndex === 0 && imageIndex < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
