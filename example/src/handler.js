const sharp = require('sharp')
const path = require('path')

exports.handler = async event => {
  try {
    const imagePath = path.resolve('./src/lucky.jpg')
    console.log(imagePath)
    const img = await sharp(imagePath)
      .withMetadata()
      .resize(800)
      .convolve({
        width: 3,
        height: 3,
        kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
      })
      .webp()
      .toBuffer()

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/webp'
      },
      body: img.toString('base64'),
      isBase64Encoded: true
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
