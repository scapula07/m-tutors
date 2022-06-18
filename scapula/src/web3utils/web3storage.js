import { create } from 'ipfs-http-client'


const projectId = '2AL0mhmsSqH4pNDZFoLHEc2K6w3';
const projectSecret = 'b676bdd8f7d89fa6b51ec871b7a94f12';
const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});