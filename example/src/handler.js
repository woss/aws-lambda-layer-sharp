const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.handler = async event => {
  try {
    // Read the file to a buffer
    const imagePath = path.resolve('./src/lucky.jpg')
    const imgBuf = fs.readFileSync(imagePath)

    // Extract the qs from the event
    const { queryStringParameters } = event
    console.log(`Got query params `, queryStringParameters)
    const { width, height, metadata, convolve } = queryStringParameters

    // Let's create the sharp instance
    const img = sharp(imgBuf)

    if (metadata === 'true') {
      img.withMetadata()
    }

    img.resize({
      width: parseInt(width, 10) || 800,
      height: parseInt(height, 10),
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy
    })

    // for fun of it 😎
    if (convolve === 'true') {
      img.convolve({
        width: 3,
        height: 3,
        kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
      })
    }

    // transform to the webp format
    img.webp()

    // last thing is to get the buffer of cloned instance
    const image = await img.clone().toBuffer()

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/webp'
      },
      body: image.toString('base64'),
      isBase64Encoded: true
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
