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

- 0.0.16 MAINNET 
The App is now Available from app.ricardianfabric.com
Further links to the app will not be documented here 



Dependencies:

The latest version of the bundlr-network can be found here:
https://unpkg.com/browse/@bundlr-network/client@0.8.6/build/

It's imported from unpkg due to a build error when I try to inclide it in the app using the npm module.