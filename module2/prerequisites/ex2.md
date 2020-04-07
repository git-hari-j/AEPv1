## Exercise 2.1.2: Setup and Configuration of Postman
In this exercise, the goal is to install and configure everything that is needed to run through the exercises.

Go to [https://www.getpostman.com/](https://www.getpostman.com/). 

Click on "Get Started".

![Adobe IO New Integration](./images/getstarted.png)

Next, download and install Postman.

![Adobe IO New Integration](./images/downloadpostman.png)

After installation of Postman, start the application.

In Postman, there are 2 concepts: Environments and Collections.

  * The Environment contains all of your environmental variables which are more or less consistent. In the Environment, you'll find things like the IMSOrg of our Platform environment, alongside security credentials like your Private Key and others.
  * The Collection contains a number of API calls that you can use. We will use 2 collections
    * 1 Collection for Authentication to Adobe IO
    * 1 Collection for our Exercises

Please download [postman.zip](./downloads/postman.zip) from the GitHub repository to your local desktop. 

In this [postman.zip](./downloads/postman.zip)-file, you'll find the following files:

  * \_Adobe IO - Token.postman\_collection.json
  * \_Infosys Platform Enablement - JWT Start.postman_environment.json
  * \_Partner - Enablement - Infosys.postman_collection.json

Unzip the postman.zip-file and store these 3 files in a folder on your desktop.

Go back to the Postman UI.

![Adobe IO New Integration](./images/postmanui.png)

In Postman, click on "Import".

![Adobe IO New Integration](./images/import.png)

Click on "Choose files".

![Adobe IO New Integration](./images/choosefiles.png)

Navigate to the folder on your desktop in which you extracted the 3 downloaded files. Select these 3 files at the same time and click "Open".

![Adobe IO New Integration](./images/selectfiles.png)

After having clicked "Open", Postman will import the Environment and Collections and you'll get a visual confirmation of this in the bottom right corner of your screen.

![Adobe IO New Integration](./images/postmanconf.png)

Next, you need to prepare the environment to point towards your own Adobe I/O integration for Adobe Experience Platform API, which you built in exercise 2.1.2.

In Postman, look at the top right corner of the Postman application.

![Adobe IO New Integration](./images/pmtopright.png)

Click on the "Gear"-icon:

![Adobe IO New Integration](./images/pmgear.png)

The next screen is the "Manage Environments"-screen. 

![Adobe IO New Integration](./images/mngenv.png)

In this screen, you need to click on the name of our environment, "_TCS Platform Enablement - JWT Start".

![Adobe IO New Integration](./images/env.png)

Next, you'll see this screen:

![Adobe IO New Integration](./images/envdetails.png)

It's crucial to get the setup of Postman right. This is typically a challenge :-)

You have the following information available out of the box:

| Variable     | Initial Value     | Current Value             |
|:-------------:| :---------------:| :--------------: |
| IMS          | https://ims-na1.adobelogin.com | https://ims-na1.adobelogin.com |
| PLATFORM_GATEWAY    | https://platform.adobe.io | https://platform.adobe.io |
| clientID    |  | |
| clientSecret    |  | |
| IMSOrg    |118765E655DEE7427F000101@AdobeOrg | 118765E655DEE7427F000101@AdobeOrg |
| techacct    |  | |
| meta_scope    | ent\_dataservices\_sdk | ent\_dataservices\_sdk |
| secret    |  | |
| jwt_token    |  | |
| access_token    |  | |
| predicatePreviewId    |  | |
| BATCH_ID    |  | |
| previewSessionId    |  | |
| IMS_TOKEN    |  | |

Let's discuss these variables a bit. As part of this in-depth discussion, you'll be asked to go back and forth between Postman and the Integration Details of your Adobe I/0 integration for Adobe Experience Platform which you created in exercise 2.1.2.
You need to have this screen open in your browser:

![Adobe IO New Integration](./images/adobe_io_int_details_final.png)

  * **IMS** is the URL used to authenticate to Adobe I/O. This value is already filled out and shouldn't change.
  
  | Variable     | Initial Value     | Current Value             |
  |:-------------:| :---------------:| :--------------: |
  | IMS          | https://ims-na1.adobelogin.com | https://ims-na1.adobelogin.com |
  
  * **PLATFORM_GATEWAY** is the URL used to 'speak' with Platform. This value is already filled out and shouldn't change.
  
  | Variable     | Initial Value     | Current Value             |
  |:-------------:| :---------------:| :--------------: |
  | PLATFORM_GATEWAY    | https://platform.adobe.io | https://platform.adobe.io |
  
  * **clientID** is a variable that is directly linked to your Adobe I/O setup. In the Integration Details of your Adobe I/O integration for Adobe Experience Platform, you'll see a variable called "API Key (Client ID)". 
  ![Adobe IO New Integration](./images/apikeyclientid.png)
  
  Copy your Client ID and paste it in Postman as the value next to the variable clientID in the "Initial Value" and the "Current Value"-columns.
  
  | Variable      | Initial Value       | Current Value      |
  |:-------------:| :------------------:| :----------------: |
  | clientID      | **your Client ID** | **your Client ID**|
  
  * **clientSecret** is a variable that is directly linked to your Adobe I/O setup. In the Integration Details of your Adobe I/O integration for Adobe Experience Platform, you'll see a variable called "Client Secret" and next to that, a button named "Retrieve Secret". 

  ![Adobe IO New Integration](./images/retrievesecret.png)
  
  Click the "Retrieve Client Secret"-button to find your Client Secret.
![Adobe IO New Integration](./images/secret.png)
 
  Copy your Client Secret and paste it in Postman as the value next to the variable clientSecret in the "Initial Value" and the "Current Value"-columns.

  | Variable      | Initial Value       | Current Value      |
  |:-------------:| :------------------:| :----------------: |
  | clientSecret      | **your Client Secret** | **your Client Secret**|

  * **IMSOrg** is the unique identifier of our Adobe Experience Platform Org. This value is already filled out and please change to the following IMSOrg value: **118765E655DEE7427F000101@AdobeOrg**
  
  | Variable     | Initial Value     | Current Value             |
  |:-------------:| :---------------:| :--------------: |
  | IMSOrg    | 118765E655DEE7427F000101@AdobeOrg | 118765E655DEE7427F000101@AdobeOrg |
  
  * **techacct** is a variable that is directly linked to your Adobe I/O setup. In the Integration Details of your Adobe I/O integration for Adobe Experience Platform, you'll see a variable called "Technical Account ID". 
  
  ![Adobe IO New Integration](./images/techaccid.png)
  
  Copy your Technical Account ID and paste it in Postman as the value next to the variable techacct in the "Initial Value" and the "Current Value"-columns.
  
  | Variable      | Initial Value       | Current Value      |
  |:-------------:| :------------------:| :----------------: |
  | techacct      | **your Technical Account ID** | **your Technical Account ID**|
  
  * **meta_scope** refers directly to the SDK we're using with Adobe I/O and Platform. This value is already filled out and shouldn't change.

  | Variable      | Initial Value       | Current Value      |
  |:-------------:| :------------------:| :----------------: |
  | meta_scope    | ent\_dataservices_sdk | ent\_dataservices_sdk |
  
  * **secret** is, well, a secret and it should continue to be one. This is the field in Postman where you have to paste your Private Key. In exercise 2.1.1 you created your own Public Key certificate and your Private Key. The Public Key certificate is part of Adobe I/O and Adobe I/O expects you to provide the Private Key when authenticating. To do that, you have to paste your full Private Key in this field. 
  Locate your Private Key on your desktop. The Private Key's filename is **private.key**.
  
  ![Adobe IO New Integration](./images/privatekey.png)
  
 Open the file **private.key** using a text editor of choice. This is what you should see:
  
  ![Adobe IO New Integration](./images/pkeyfull.png)
  
  Copy everything. Really, everything! You have to include the first line ```-----BEGIN PRIVATE KEY-----``` AND also the last line ```-----END PRIVATE KEY-----```.
  
  Paste your full Private Key in Postman as the value next to the variable secret in the "Initial Value" and the "Current Value"-columns.
  
  | Variable      | Initial Value       | Current Value      |
  |:-------------:| :------------------:| :----------------: |
  | secret    | ```-----BEGIN PRIVATE KEY-----``` **+ all text in between +**  ```-----END PRIVATE KEY-----```| ```-----BEGIN PRIVATE KEY-----``` **+ all text in between +**  ```-----END PRIVATE KEY-----``` |
  
  * **jwt_token** is the token that you'll receive when you're successfully authenticated by Adobe I/O. This should remain empty and will automatically be populated by Postman.
  
  * **access_token** is a token that will be calculated by Postman before sending the call to Adobe I/O. This will automatically be populated by Postman.
  
  * **predicatePreviewId** is a variable that will be used by Postman in some of the API-calls we'll be using. This will automatically be populated by Postman.
  
  * **BATCH_ID** is a variable that will be used by Postman in some of the API-calls we'll be using. This will automatically be populated by Postman.
  * **previewSessionId** is a variable that will be used by Postman in some of the API-calls we'll be using. This will automatically be populated by Postman.
  * **IMS_TOKEN** is a variable that will be used by Postman in some of the API-calls we'll be using. This will automatically be populated by Postman.

So, after all of the above steps, your Postman Environment should look like this:

| Variable     | Initial Value     | Current Value             |
|:-------------:| :---------------:| :--------------: |
| IMS          | https://ims-na1.adobelogin.com | https://ims-na1.adobelogin.com |
| PLATFORM_GATEWAY    | https://platform.adobe.io | https://platform.adobe.io |
| clientID    | **your Client ID** | **your Client ID** |
| clientSecret    | **your Client Secret** | **your Client Secret** |
| IMSOrg    | 91D55B255640B3AE7F000101@AdobeOrg | 91D55B255640B3AE7F000101@AdobeOrg |
| techacct    | **your Technical Account ID** | **your Technical Account ID** |
| meta_scope    | ent\_dataservices\_sdk | ent\_dataservices\_sdk |
| secret    | ```-----BEGIN PRIVATE KEY-----``` **+ all text in between +**  ```-----END PRIVATE KEY-----``` | ```-----BEGIN PRIVATE KEY-----``` **+ all text in between +**  ```-----END PRIVATE KEY-----``` |
| jwt_token    |  | |
| access_token    |  | |
| predicatePreviewId    |  | |
| BATCH_ID    |  | |
| previewSessionId    |  | |
| IMS_TOKEN    |  | |

  This is the expected view in Postman after filling out all the values. These are sample values off course, your columns of Initial Value and Current Value should contain your own, specific values that come straight from your Adobe I/O setup in exercise 2.1.2.
  
![Adobe IO New Integration](./images/postmanenvfull.png) 
   
Don't forget to click the "Update"-button to save all your changes.

![Adobe IO New Integration](./images/update.png)

Let's test if your setup is successfull...
Go to Postman and locate the collection with the name \_Adobe I/O - Token. 
If this is the first time you're using Postman, you'll have to click on the "Collections"-button in the left side menu first. After this, you'll see the "\_Adobe I/O - Token"-collection.

![Adobe IO New Integration](./images/opencoll.png)

![Adobe IO New Integration](./images/iocoll.png)

Make sure that you've got the right Environment selected before executing any call. You can check the currently selected Environment by verifying the Environment-dropdown list in the top right corner. If it is the first time you're using Postman, it'll probably say "No Environment".

![Adobe IO New Integration](./images/envsel.png)

The selected Environment should be "_TCS Platform Enablement - JWT Start".

![Adobe IO New Integration](./images/env.png)

You need to load an external library that will take care of the encryption and decryption of communication. To load this library, you have to execute the call with the name ```INIT: Load Crypto Library for RS256```. Select this call in the \_Adobe I/O - Token collection and you'll see it displayed in the middle of your screen.

![Adobe IO New Integration](./images/cryptolib.png)

Click the blue "Send"-button. After a couple of seconds, you should see a response displayed in the "Body" section of Postman:

![Adobe IO New Integration](./images/cryptoresponse.png)

With the crypto libray now loaded, we can authenticate to Adobe I/O.
In the \_Adobe I/O - Token collection, select the call with the name ```IMS: JWT Generate + Auth```. Again, you'll see the call details displayed in the middle of the screen.

![Adobe IO New Integration](./images/ioauth.png)

Click the blue "Send"-button. After a couple of seconds, you should see a response displayed in the "Body" section of Postman:

![Adobe IO New Integration](./images/ioauthresp.png)

If your configuration was successfull, you should see a similar response that contains the following information:

| Key     | Value     | 
|:-------------:| :---------------:| 
| token_type          | **bearer** |
| access_token    | **eyJ4NXUiOiJ...o6anVZORc0ZQ** | 
| expires_in          | **86399973** |

Adobe I/O has given us a 'bearer'-token, with a specific value (this very long access_token) and an expiration window.

The token that we've received is now valid for 24 hours. This means that in 24 hours, if you want to use Postman to authenticate to Adobe I/O, you will have to generate a new token by running this call again.

**IMPORTANT**

To repeat this: as part of the exercises, you'll have to run this call again. So if your 24-hour window has gone, you have to go back to the _Adobe I/O - Token collection, select the call with the name ```IMS: JWT Generate + Auth``` and click the blue "Send"-button again to receive a new token that will again be valid for 24 hours.

**IMPORTANT**

[Next Step: Update your La Boutique demo site](./ex3.md)

[Go Back to Module 2](../README.md)

[Go Back to All Modules](/../../)



