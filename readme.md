# Ricardian-Fabric DAO

    >======>                                         >=>                                 >=======>             >=>                          
    >=>    >=>    >>                                 >=>  >>                             >=>                   >=>               >>         
    >=>    >=>          >==>    >=> >=>  >> >==>     >=>        >=> >=>  >==>>==>        >=>          >=> >=>  >=>      >> >==>        >==> 
    >> >==>      >=>  >=>     >=>   >=>   >=>     >=>>=> >=>  >=>   >=>   >=>  >=>       >=====>    >=>   >=>  >=>>==>   >=>    >=>  >=>    
    >=>  >=>     >=> >=>     >=>    >=>   >=>    >>  >=> >=> >=>    >=>   >=>  >=>       >=>       >=>    >=>  >=>  >=>  >=>    >=> >=>     
    >=>    >=>   >=>  >=>     >=>   >=>   >=>    >>  >=> >=>  >=>   >=>   >=>  >=>       >=>        >=>   >=>  >=>  >=>  >=>    >=>  >=>    
    >=>      >=> >=>    >==>   >==>>>==> >==>     >=>>=> >=>   >==>>>==> >==>  >=>       >=>         >==>>>==> >=>>==>  >==>    >=>    >==> 
                                                                                                                                            

## DOCS

Detailed docs on how to use it can be found at docs.ricadianfabric.com


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


## Latest Deployments

- 0.0.13 MAINNET
  Infura deprecated the IPFS API service broke all previous versions that used it so the next release fixes this issue by removing IPFS. 
  It was a good experiment but the contracts are saved by spending AR from now on again. There is no free version, however the contract accepting has been refactored so contract signers only need to sign with metamask and there are no more deployments.

  Deployments: https://gnszihbakzryaihgrqjum7a727a7wxggc2vwyp7abvxob7cxukpq.arweave.net/M2WUHCBWY4Ag5owTRnwf18H7XMYWq2w_4A1u4PxXop8

  DAO: STILL REFACTORING 


- 0.0.12 MAINNET

  Update: Migration to polygon
  Due to the Harmony Bridge hack and the collapse of the ecosystem, deployed the DAO to Polygon.

  Deployments: https://tpou22egyefsxslyvnjmlq2izsfpmo54epsbrvgvjezndde2.arweave.net/m91NaIbB_CyvJeKtSxcNIzIr2O7wj5BjU1Uk_y0Yyak

  DAO: https://flmywpggg4vzssdsmkmyu7uhsc6fxr3bpo7g2imr644elzk4l67q.arweave.net/KtmLPMY3K5lIcmKZin6HkLxbx2F7vm0hkfc4ReVcX78

- 0.0.11 MAINNET

  Update: A small ui bug on the smart contract page

  Deployments: https://awwl3mynzw2cpwudy3kaqi2jr4o4mjgnta4reeayyk6g2qw3.arweave.net/Bay9sw3NtCfag8bUCCNJjx-3-GJM2YORIQGMK8bULbc

  DAO: https://ky5spuqiddal4yu7clzo6dwrjkucapb63qxl6dzchfi2nyqyhvdq.arweave.net/Vjsn0ggYwL5inxLy7w7RSqggPD7cLr8PIjlRpuIYPUc

- 0.0.10 MAINNET

  update: ipfsArweave arql query deprecated

  Deployments: https://arweave.net/mPSGy4AETUxXBY-86qSSDMK6c5K3oh0OILXPNPXKwYY

  DAO: https://arweave.net/RZb7gB2mV80ZZBLkzEJRynOav3nR6koWBOUpU-Xa18Q

- 0.0.9 MAINNET :

  Deployments :https://breja4wglf2gerk2i2fjvtg5kv64dilvrbp2t4ibp5iyfg2hfi.arweave.net/DEiQcsZZd_GJFWkaKmszdVX3BoXWIX6nxAX9RgptHKk

  DAO: https://faibduxxbf4eahodzq5z5buvj6pfezpzxtsovoul3ab3vmi.arweave.net/KBAR0vcJeEA-dw8w7noaVT55_SZfm85Oq6i-9-gDurE

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
