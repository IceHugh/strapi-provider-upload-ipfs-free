const IpfsFree = require('ipfs-free').default
console.log(IpfsFree)
const fs = require('fs');
const fsp = fs.promises;

const main = async () => {
  const file = await fsp.readFile('./test.txt');
  console.log(file);
  const ipfsFree = new IpfsFree(
    {
      web3: [
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUxZmYzOTBFRWNFNTU2NkM5Nzk5NjMzNWVBMWIwMTI0NTJCNUIwZGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODU0MTA5OTc4MjEsIm5hbWUiOiJpcGZzLWZyZWUifQ.v5fnRKUweMI8vjsVArw0E2jo4FB0nQAO-MRgkPGm0F4',
        },
      ],
      everland: [
        {
          key: 'V7PBT2LPKDQZ73TIKGCV',
          secret: 'TBBRcUvqLymY+V4kVRkpw6UhL5kJmon9dLzdteWl',
          bucket: 'ipfs-free',
        },
      ],
      pinata: [
        {
          key: '534e469ff1737cbd1431',
          secret:
            'ed1caf96e51cff0d170d92b7280e34962f0442e20a5d87f6025ca137a00c697c',
        },
      ],
      lighthouse: [
        {
          token: 'ec131273.dd503b77e08f4a58b72bd201e56dc9cb',
        },
      ],
      filebase: [
        {
          key: '86E1A139951582E6788B',
          secret: 'nA38SdVNJLJved8grbVtjV2N6aE8lbKjImOreKVr',
          bucket: 'ipfs-free',
        },
      ],
      infura: [
        {
          key: 'e3334df0d9a14a46b38eae73c0834b4a',
          secret: '35cba859cda348a99302178d5da8de9a',
        },
      ],
    },
    { default: 'filebase' },
  );
  const cid = await ipfsFree.upload({
    buffer: file,
    // url: 'https://bafkreifgmwsfsiccf6ouc7sim7x5yt5yubfb6p77d6qh5gmoq337pit24m.ipfs.4everland.io/?from=4everland',
  });
  console.log(cid);
};
main();
