require('axios-debug-log')
const axios = require('axios')
const sharp = require('sharp')
const mime = require('mime-types')

const imagePath =
  'https://s3-eu-west-1.amazonaws.com/sensio.photo/public-assets/20160903-_MG_5320.jpg'

exports.handler = async event => {
  try {
    const { data: imageData } = await axios.get(imagePath, {
      responseType: 'arraybuffer'
    })

    const img = await sharp(imageData)
      .withMetadata()
      .resize(800)
      .convolve({
        width: 3,
        height: 3,
        kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
      })
      .webp()
      .toBuffer()

    const ContentType = mime.contentType('webp')
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': ContentType
      },
      body: img.toString('base64'),
      isBase64Encoded: true
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
