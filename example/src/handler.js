const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const qsToSharp = require('@sensio/qs-to-sharp')
/**
 * Read the LUCKY image file
 */
function readTheLuckyFile() {
  // Read the file to a buffer
  const imagePath = path.resolve('./src/lucky.jpg')
  const imgBuf = fs.readFileSync(imagePath)
  return imgBuf
}

exports.handler = async event => {
  try {
    // Extract the qs from the event
    let queryStringParameters = event.queryStringParameters || {}
    console.log(`Got query params `, queryStringParameters)
    const { fm } = queryStringParameters

    const operations = qsToSharp.transform(queryStringParameters)
    // console.log(operations, queryStringParameters)

    // Let's create the sharp instance
    const img = sharp(readTheLuckyFile())

    for (const func in operations) {
      if (operations.hasOwnProperty(func)) {
        const options = operations[func]
        console.log(func, options)

        if (options) {
          console.log(`calling  image[${func}](${options})`)
          img[func](options)
        } else {
          console.log(`calling  image[${func}]()`)
          img[func]()
        }
      }
    }

    // if (metadata === '1') {
    //   img.withMetadata()
    // }

    // img.resize({
    //   width: parseInt(width, 10) || 800,
    //   height: parseInt(height, 10),
    //   fit: sharp.fit.cover,
    //   withoutEnlarge: true,
    //   position: sharp.strategy.entropy
    // })

    // // for fun of it 😎
    // if (convolve) {
    //   img.convolve({
    //     width: 3,
    //     height: 3,
    //     kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    //   })
    // }

    // // transform to the webp format
    // img.webp()

    // last thing is to get the buffer of cloned instance
    const image = await img.clone().toBuffer()

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': `image/${fm || 'webp'}`
      },
      body: image.toString('base64'),
      isBase64Encoded: true
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
