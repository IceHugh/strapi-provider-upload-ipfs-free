'use strict'
/**
 * Module dependencies
 */
const sharp = require('sharp')
const IpfsFree = require('ipfs-free').default
/* eslint-disable no-unused-vars */
// Public node modules.
const parseBoolean = (value) => {
  if (typeof value === 'boolean') {
    return value
  }
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return false
}
module.exports = {
  init(config) {
    config.options = config.options || {}
    config.options.random = parseBoolean(config.options.random)
    const ipfsFree = new IpfsFree(config.providers, config.options)
    return {
      // uploadStream(file) {
      //   console.log(file)
      //   return new Promise(async (resolve, reject) => {
      //     try {
      //       const { cid, url } = await ipfsFree.upload(file.buffer)
      //       file.url = url
      //       file.cid = cid
      //       resolve()
      //     } catch (e) {
      //       reject(e)
      //     }
      //   })
      // },
      async upload(file) {
        const { mime, buffer } = file
        const { enabeld = false, quality = 70 } =
          config.options.compression || {}
        let content = buffer
        const _enabled = parseBoolean(enabeld)
        if (mime.indexOf('image') > -1 && _enabled) {
          content = await sharp(buffer)
            .webp({ quality: Number(quality) })
            .toBuffer()
          file.mime = 'image/webp';
          file.size = await sharp(content)
            .metadata()
            .then((info) => info.size)
          file.size = Math.ceil(file.size / 1024);
        }
        return new Promise(async (resolve, reject) => {
          try {
            const { cid, url } = await ipfsFree.upload({ buffer: content })
            file.url = url
            file.name = cid
            file.hash = cid
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      },
      delete(file) {
        return new Promise(async (resolve, reject) => {
          try {
            await ipfsFree.delete({
              hash: file.hash,
              url: file.url,
            })
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      },
    }
  },
}
