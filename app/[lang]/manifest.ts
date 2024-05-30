import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dulafra foto corner',
    short_name: 'Dulafra',
    description:
      'Fotografiranje sportskih događaja. Izrada fotografija, šalica, postera i Fifa kartica sa slikama igrača po vlastitom izboru.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF6EE',
    theme_color: '#FFF6EE',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '72x72',
        type: 'image/icon'
      }
    ]
  }
}
