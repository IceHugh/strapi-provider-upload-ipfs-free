'use strict'
/**
 * Module dependencies
 */
const IpfsFree = require('ipfs-free').default
/* eslint-disable no-unused-vars */
// Public node modules.
module.exports = {
  init(config) {
    console.log(config)
    const ipfsFree = new IpfsFree(config.config, config.options)
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
            file.cid = cid
            file.name = cid
            file.hash = cid
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      },
      delete(file) {
        console.log(file)
        return new Promise(async (resolve, reject) => {
          try {
            await ipfsFree.delete({
              hash: file.cid,
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
