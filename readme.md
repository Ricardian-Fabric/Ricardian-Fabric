# Ricardian-Fabric DAO

## DOCS

Detailed docs on how to use it can be found at docs.ricadianfabric.com

The latest version of ricadian fabric.
DEPLOYED AT:

- 0.0.6 https://arweave.net/7LQK3kLSscrmYUmt3dXhoO0PE8W5tqG-UyDSEAfm5q8
  Updated splashpage
  Harmony mainnet added to ricardian contract
  Sped up voting for testnet
  bugfixes
  polling period variables on testnet

- 0.0.5 https://licyt5slcklm3hq6n5enxhqtg3zkddzaj3estirwvkpijmayju.arweave.net/WgWJ9ksSls2eHm9I254TNvKhjyBOySm-iNqqehLAYTU
- 0.0.4 https://5sogpgw5uhq7a6lr3kkw7mxkq2mxvgikf66qujhhmte5zntm.arweave.net/7Jxn_mt2h4fB5cdqVb7L-qhpl6mQovvQok52TJ3LZsI

## Use

Run the front end

`yarn run dev`

## Deployment

`yarn build`

After the build, the js dependency must be separately deployed.

The URL to access it must be placed into the data-dependency on page.
The state must be configured for using this dataprop with getSourceFromDataProp(pageEl)

Bump up the version in the data-version prop too.

Then run `yarn inline`

The final bundle.html is ready to be deployed!

Upload these files using the Ricardian Fabric permaweb upload feature
