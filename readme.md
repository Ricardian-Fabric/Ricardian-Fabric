# Ricardian-Fabric DAO

## DOCS

Detailed docs on how to use it can be found at docs.ricadianfabric.com

The latest version of ricadian fabric.

- 0.0.8 Deployed on TESTNET:

  Deployments: https://arweave.net/RJCDv2Mnl_D39-f2E_cnH0bFTZUz6QSQkiPC4bNsn2c

  DAO: https://arweave.net/tR0rVVRSbpTFyddPIvIjTJm-eFdUUHJETI5ye3mUlo4

DEPLOYED ON MAINNET:

- 0.0.7 https://ervded4meifzaaglk6j5sxqmioenu4ibajhx4o3m7x2stsbi.arweave.net/JGoyD4wiC5AAy1eT-2V4MQ4jacQECT347bP-31Kcgo8

DEPLOYED on TESTNET:

- 0.0.7 https://arweave.net/tYv0dNOrUVEHe2fg2rctyxkp0-W0oPf4-AinkYlwtC0
  After feedback from early users, changed the tokensale to a static 5RIC/ONE
  Updated the way proposals are uploaded, it now uses the medium editor and the downloads button leads to trails

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

### IMPORTANT

AppType property on the index.html #page is used to change menu options on the deployed app.

use this for dao

    data-apptype="dao"

and this for contract deployments

    data-apptype="deployments"
