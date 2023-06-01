# Strapi Provider Upload IPFS Free

IPFS (Filebase, Pinata, 4Everland, Web3, Lighthouse) provider for Strapi uploads.

## Installation

```bash
# using yarn
yarn add strapi-provider-upload-ipfs-free

# using npm
npm install strapi-provider-upload-ipfs-free --save
```

### Providers Configuration

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-ipfs-storage",
      providerOptions: {
        config: {
          filebase: {
            // https://console.filebase.com/keys
            key: env("FILEBASE_KEY"),
            secret: env("FILEBASE_SECRET"),
            bucket: env("FILEBASE_BUCKET"),
          },
          pinata: {
            // https://app.pinata.cloud/keys
            key: env("PINATA_KEY"),
            secret: env("PINATA_KEY"),
          },
          everland: {
            // https://docs.4everland.org/storage/bucket/s3-compatible-api
            key: env("EVERLAND_KEY"),
            secret: env("EVERLAND_SECRET"),
            bucket: env("EVERLAND_BUCKET"),
          },
          web3: {
            // https://web3.storage/tokens/
            token: env("WEB3_TOKEN"),
          },
          lighthouse: {
            // https://files.lighthouse.storage/dashboard/apikey
            token: env("LIGHTHOUSE_TOKEN"),
          },
        }
        options: {
          default: 'filebase',
          random: false,
        }
      },
    },
  },
  // ...
});
```

`.env`

```bash
FILEBASE_KEY=""
FILEBASE_SECRET=""
FILEBASE_BUCKET=""

PINATA_KEY=""
PINATA_SECRET=""

EVERLAND_KEY=""
EVERLAND_SECRET=""
EVERLAND_BUCKET=""

WEB3_TOKEN=""

LIGHTHOUSE_TOKEN=""
```

## options params

- default (Specify to select one of config provider)
- random (randomly choose one of config provider)

## Filebase Variable [ [tutorial](https://docs.filebase.com/configurations/third-party-configurations/backup-client-configurations/strapi-provider-plugin) ]


| Variable | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| key      | string | Filebase access key    | yes      |
| secret   | string | Filebase access secret | yes      |
| bucket   | string | Filebase bucket name   | yes      |


## Pinata Variable

| Variable | Type   | Description          | Required |
|----------|--------|----------------------|----------|
| key      | string | Pinata access key    | yes      |
| secret   | string | Pinata access secret | yes      |

## 4Everland Variable

| Variable | Type   | Description             | Required |
|----------|--------|-------------------------|----------|
| key      | string | 4Everland access key    | yes      |
| secret   | string | 4Everland access secret | yes      |
| bucket   | string | 4Everland bucket name   | yes      |


## Web3 Variable

| Variable | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| token    | string | Web3 Storage API Token | yes      |

## Lighthouse Variable

| Variable | Type   | Description                  | Required |
|----------|--------|------------------------------|----------|
| token    | string | Lighthouse Storage API Token | yes      |


### Security Middleware Configuration

Due to the default settings in the Strapi Security Middleware you will need to modify the `contentSecurityPolicy` settings to properly see thumbnail previews in the Media Library. You should replace `strapi::security` string with the object bellow instead as explained in the [middleware configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order) documentation.

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "*.ipfs.dweb.link", // ipfs.tech
            "*.ipfs.cf-ipfs.com", // cloudflare.com
            "*.ipfs.w3s.link", // web3.storage
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

## Links

- [Strapi website](https://strapi.io/)
- [IPFS website](https://ipfs.tech/)
- [Filebase website](https://filebase.com/)
- [Pinata website](https://pinata.cloud/)
- [4Everland website](https://dashboard.4everland.org/)
- [Web3 website](https://web3.storage/)
- [Lighthouse website](https://lighthouse.storage/)

---

`(c)` Alex Baker