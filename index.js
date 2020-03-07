import { imageSync } from 'qr-image'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url)
      const text = url.searchParams.get('text')

      return generateQrCode({ text })
    } catch (err) {
      return new Response('Internal Server Error', {
        status: 500
      })
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405
    })
  }
}

function generateQrCode({
  text
}) {
  const image = imageSync(text || 'https://blog.nyandev.id')

  return new Response(image, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000'
    }
  })
}