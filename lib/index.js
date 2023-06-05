'use strict'
/**
 * Module dependencies
 */
const IpfsFree = require('ipfs-free').default
/* eslint-disable no-unused-vars */
// Public node modules.
module.exports = {
  init(config) {
    if (typeof config.options.random !== 'boolean') {
      if (config.options.random === 'true') {
        config.options.random = true
      } else if (config.options.random === 'false') {
        config.options.random = false
      } else {
        config.options.random = false
      }
    }
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
      upload(file) {
        return new Promise(async (resolve, reject) => {
          try {
            const { cid, url } = await ipfsFree.upload({ buffer: file.buffer })
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
