## Exercise 2.2: Understanding Identity
In this exercise, the goal is to fully understand what Identity means, what ID-syncs are and why this is crucial to understand when talking about Adobe Experience Platform.

### Learning Objectives

- Understand Identity, ID-syncs and Device Coop
- Be able to reproduce the "Trees in the Forest"-whiteboard.
- Be able to articulate the concept of ID-syncs

### Lab Resources

- [Video & Whiteboard: Identity, ID-syncs and Device Coop](http://bit.ly/2DWorZe)

### Lab Tasks

- Query Adobe I/O to retrieve your own Identity and understand which ID's are part of your profile in the "La Boutique"-website context.

Let's first understand the basics by having a look at this video, which explains the concepts of Identity, ID-syncs and Device Coop.

[![Video & Whiteboard: Identity, ID-syncs and Device Coop](./images/video.png)](http://bit.ly/2DWorZe) 

Now that you have a basic understanding of Identity, Namespaces and ID's, let's review the configuration you did in Module 1.

#### Exercise 2.2.1 - Introduction to your Identifiers

First of all, you built a rule "All Authenticated Pages". This rule is activated when a customer is logged in.

The first action in this rule is to send a Beacon to Adobe Experience Platform. In the configuration of this beacon, you've told Launch to capture data elements like customerFirstName, customerEmail and customerMobileNr and send the values of those data elements to Platform. Below is a sample of such a call, which contains a number of values, but also a number of identities.

You can find this call yourself on your website by going into Chrome and opening the Chrome Developer Tools, just like you did in Module 1, Exercise 1.2.8. If you need help, go back to [Exercise 1.2.8](../../module1/launch/ex8.md).

```
{
  "header": {
    "datasetId": "5d9ef2eceadb4f162449c7c0",
    "imsOrgId": "E57736825B9A0ECF0A495D19@AdobeOrg",
    "source": {
      "name": "Launch - vangeluw"
    },
    "schemaRef": {
      "id": "https://ns.adobe.com/tcsamericasptrsd/schemas/97966a601c63ee8bbd188dd76b3373a9",
      "contentType": "application/vnd.adobe.xed-full+json;version=1"
    }
  },
  "body": {
    "xdmMeta": {
      "schemaRef": {
        "id": "https://ns.adobe.com/tcsamericasptrsd/schemas/97966a601c63ee8bbd188dd76b3373a9",
        "contentType": "application/vnd.adobe.xed-full+json;version=1"
      }
    },
    "xdmEntity": {
      "_repo": {
        "createDate": "2019-10-30T17:13:21Z"
      },
      "person": {
        "name": {
          "lastName": "Van Geluwe",
          "firstName": "Wouter"
        },
        "gender": "male",
        "birthDate": "1982-01-01"
      },
      "optInOut": {
        "_channels": {
          "sms": "in",
          "email": "in",
          "phone": "in",
          "directMail": "out"
        }
      },
      "homeAddress": {
        "city": "Waregem",
        "country": "Belgium",
        "street1": "Bosstraat 32",
        "postalCode": "8790"
      },
      "mobilePhone": {
        "number": "+32473622044+30102019-2"
      },
      "personalEmail": {
        "address": "woutervangeluwe+30102019-2@gmail.com"
      },
      "profilePictureLink": "http://s7e4a.scene7.com/is/image/OmniPS/adobelogo?$fmt=alpha-png",
      "_TCS": {
        "retailSizes": {
          "shoeSize": "43",
          "shirtSize": "L",
          "preferredColor": "black"
        },
        "faceDetection": {
          "estimatedAge": "",
          "estimatedGender": "unknown",
          "estimatedEmotion": "",
          "estimatedGlasses": "",
          "estimatedEyeMakeup": "",
          "estimatedLipMakeup": ""
        },
        "identification": {
          "ecid": "66946943469759516242944598678589078139",
          "emailId": "woutervangeluwe+30102019-2@gmail.com",
          "mobilenr": "+32473622044+30102019-2"
        }
      }
    }
  }
}
```

Let's zoom in on the identities-part of this call.

```
        "identification": {
          "ecid": "66946943469759516242944598678589078139",
          "emailId": "woutervangeluwe+30102019-2@gmail.com",
          "mobilenr": "+32473622044+30102019-2"
        }
```

In the identities-property, we can see 3 Identity Types and ID's are being used:

| Identity Type             | ID |
|:---------------------:|:--|
| **ecid**              | 66946943469759516242944598678589078139 |
| **email**             |woutervangeluwe+30102019-2@gmail.com|
| **phone**          |+32473622044+30102019-2|

These are the branches of the tree. Since these 3 ID's have been part of the same call to Platform, they are synced to eachother.

With the above Namespace and ID's in mind, let's have a look at your own identity in Platform, based on the interactions you've had with the "La Boutique"-website.

You need to know your values for these namespaces. To find these values, the easiest thing to do is to go onto the X-ray panel, which will show you all available ID's.

![Adobe IO New Integration](./images/xrayids.png)

With these ID's in mind, go to Postman.

![Adobe IO New Integration](../prerequisites/images/postmanui.png)

Before sending a request to Platform, you need to be properly authenticated. To be authenticated, you need to request an access token.

#### Exercise 2.2.2 - Postman authentication to Adobe I/O

If you're already authenticated and have a valid access_token/bearer token, you can continue directly to "Exercise 2.2.3 - Unified Profile API".

Make sure that you've got the right Environment selected before executing any call. You can check the currently selected Environment by verifying the Environment-dropdown list in the top right corner. 

The selected Environment should be "_TCS Platform Enablement".

You need to load an external library that will take care of the encryption and decryption of communication. To load this library, you have to execute the call with the name ```INIT: Load Crypto Library for RS256```. Select this call in the \_Adobe I/O - Token collection and you'll see it displayed in the middle of your screen.

![Adobe IO New Integration](../prerequisites/images/iocoll.png)

![Adobe IO New Integration](../prerequisites/images/cryptolib.png)

Click the blue "Send"-button. After a couple of seconds, you should see a response displayed in the "Body" section of Postman:

![Adobe IO New Integration](../prerequisites/images/cryptoresponse.png)

With the crypto libray now loaded, we can authenticate to Adobe I/O.
In the \_Adobe I/O - Token collection, select the call with the name ```IMS: JWT Generate + Auth```. Again, you'll see the call details displayed in the middle of the screen.

![Adobe IO New Integration](../prerequisites/images/ioauth.png)

Click the blue "Send"-button. After a couple of seconds, you should see a response displayed in the "Body" section of Postman:

![Adobe IO New Integration](../prerequisites/images/ioauthresp.png)

If your configuration was successfull, you should see a similar response that contains the following information:

| Key     | Value     | 
|:-------------:| :---------------:| 
| token_type          | **bearer** |
| access_token    | **eyJ4NXUiOiJ...o6anVZORc0ZQ** | 
| expires_in          | **86399973** |

Adobe I/O has given us a 'bearer'-token, with a specific value (this very long access_token) and an expiration window.

The token that we've received is now valid for 24 hours. This means that in 24 hours, if you want to use Postman to authenticate to Adobe I/O, you will have to generate a new token by running this call again.

#### Exercise 2.2.3 - Unified Profile API, Schema: Profile

Now you can go ahead and send your first call to Platform's Unified Profile Service API's.

In Postman, locate the collection \_TCS Platform Enablement - JWT Start

![Adobe IO New Integration](./images/coll_enablement.png)

In "1. Unified Profile Service", select the first call with the name "UPS - GET Profile by Entity ID & NS".

![Adobe IO New Integration](./images/callecid.png)

For this call, there are 3 required variables:

| Key     | Value     | 
|:-------------:| :---------------:| 
| entityId          | **id** |
| entityIdNS    | **namespace** | 
| schema.name          | **\_xdm.context.profile** |

* entityId = the specific customer ID
* entityIdNS = the specific namespace that is applicable to the ID
* schema.name = the specific schema for which you want to receive information

So, if you want to ask Platform's API's to give you back all Profile information for your own ecid, you will need to configure the call as follows:

| Key     | Value     | 
|:-------------:| :---------------:| 
| entityId          | **yourECID** |
| entityIdNS    | **ecid** | 
| schema.name          | **\_xdm.context.profile** |

![Adobe IO New Integration](./images/callecid.png)

Click "Send" to send your request to Platform.

You should get an immediate response from Platform, showing you something like this:

![Adobe IO New Integration](./images/callecidresponse.png)

This is the full response from Platform:

```
{
    "A28IO1HfCVXoXHv6YqPlUN0o": {
        "entityId": "A28IO1HfCVXoXHv6YqPlUN0o",
        "mergePolicy": {
            "id": "6a1e5121-d9cb-4382-84c6-cb2aa98161d4"
        },
        "sources": [
            "",
            "5d9ef2eceadb4f162449c7c0"
        ],
        "tags": [
            "",
            "1572455601447:0055:2"
        ],
        "identityGraph": [
            "A28IO1HfCVXoXHv6YqPlUN0o",
            "BUF9zMKLrXq72p4HpbsHv1SDA1LLAS0yQGdtYWlsLmNvbQ",
            "BkFuK4QcJpSPByuDA1LLAS0y",
            "CURvYQiq68RpeVhmvMwQg9KK8Q"
        ],
        "entity": {
            "personalEmail": {
                "address": "woutervangeluwe+30102019-2@gmail.com"
            },
            "_repo": {
                "createDate": "2019-10-30T17:13:21Z"
            },
            "homeAddress": {
                "country": "Belgium",
                "street1": "Bosstraat 32",
                "city": "Waregem",
                "postalCode": "8790"
            },
            "mobilePhone": {
                "number": "+32473622044+30102019-2"
            },
            "optInOut": {
                "_channels": {
                    "sms": "in",
                    "directMail": "out",
                    "phone": "in",
                    "email": "in"
                }
            },
            "_tcsamericasptrsd": {
                "faceDetection": {
                    "estimatedGender": "unknown",
                    "estimatedGlasses": "",
                    "estimatedEyeMakeup": "",
                    "estimatedAge": "",
                    "estimatedEmotion": "",
                    "estimatedLipMakeup": ""
                },
                "retailSizes": {
                    "shoeSize": "43",
                    "shirtSize": "L",
                    "preferredColor": "black"
                },
                "identification": {
                    "ecid": "66946943469759516242944598678589078139",
                    "emailId": "woutervangeluwe+30102019-2@gmail.com",
                    "mobilenr": "+32473622044+30102019-2"
                }
            },
            "person": {
                "gender": "male",
                "name": {
                    "lastName": "Van Geluwe",
                    "firstName": "Wouter"
                },
                "birthDate": "1982-01-01"
            },
            "profilePictureLink": "http://s7e4a.scene7.com/is/image/OmniPS/adobelogo?$fmt=alpha-png",
            "identityMap": {
                "ecid": [
                    {
                        "id": "66946943469759516242944598678589078139"
                    }
                ],
                "email": [
                    {
                        "id": "woutervangeluwe+30102019-2@gmail.com"
                    }
                ],
                "aaid": [
                    {
                        "id": "6108AAEBC4697958-66BCCC1083D28AF1"
                    }
                ],
                "phone": [
                    {
                        "id": "+32473622044+30102019-2"
                    }
                ]
            }
        },
        "lastModifiedAt": "2019-10-30T17:13:21Z"
    }
}
```
This is currently all of the available Profile data in Platform for this ECID.
You're not required to use the ECID to request Profile data from Platform's Unified Profile, you can use any ID in any namespace to request this data. 

Let's go back to Postman and pretend we're the call center, and send a call to Platform specifying the namespace of **phone** and your mobile number.

So, if you want to ask Platform's API's to give you back all Profile information for a specific mobilenr, you will need to configure the call as follows:

| Key     | Value     | 
|:-------------:| :---------------:| 
| entityId          | **yourmobilenr** |
| entityIdNS    | **phone** \(replace ecid with phone) | 
| schema.name          | **\_xdm.context.profile** |

If your phone number contains a ``+`` - symbol, don't forget to select your phone number completely, then right-click and select ``EncodeURIComponent``.

![Adobe IO New Integration](./images/encode.png)

![Adobe IO New Integration](./images/callmobilenr.png)

Click the blue "Send"-button and verify the response.

![Adobe IO New Integration](./images/callmobilenrresponse.png)

Let's do the same thing for your email ID by specifying the namespace of **email** and your email ID.

So, if you want to ask Platform's API's to give you back all Profile information for a specific email ID, you will need to configure the call as follows:

| Key     | Value     | 
|:-------------:| :---------------:| 
| entityId          | **youremail** |
| entityIdNS    | **email** \(replace phone with email) | 
| schema.name          | **\_xdm.context.profile** |

If your email address contains a ``+`` - symbol, don't forget to select your email address completely, then right-click and select ``EncodeURIComponent``.

![Adobe IO New Integration](./images/encodeemail.png)

![Adobe IO New Integration](./images/callemail.png)

Click the blue "Send"-button and verify the response.

![Adobe IO New Integration](./images/callemailresponse.png)

This is a very important kind of flexibility that is offered to brands. This means that any environment can send a request to Platform, using their own ID and namespace, without having to understand the complexity of multiple namespaces and ID's.

As an example:

  * the Call Center will request data from Platform using the namespace "phone"
  * the Loyalty System will request data from Platform using the namespace "email"
  * online applications might use the namespace "ecid"

The Call Center doesn't necessarily know what kind of identifier is used in the Loyalty System and the Loyalty System doesn't necessarily know what kind of identifier is used by online applications. Each individual system can use the information that they have and understand to get the information they need, when they need it.

#### Exercise 2.2.4 - Unified Profile API, Schema: Profile and ExperienceEvent

After having queried Platform's API's successfully for Profile data, let's now do the same with ExperienceEvent data.

In Postman, locate the collection \_TCS Platform Enablement - JWT Start

![Adobe IO New Integration](./images/coll_enablement.png)

In "1. Unified Profile Service", select the second call with the name "UPS - GET Profile & EE by Entity ID & NS".

![Adobe IO New Integration](./images/upseecall.png)

For this call, there are 4 required variables:

| Key     | Value     | 
|:-------------:| :---------------:| 
| schema.name          | **\_xdm.context.experienceevent** |
| relatedSchema.name          | **\_xdm.context.profile** |
| relatedEntityId          | **id** |
| relatedEntityIdNS    | **namespace** | 

* schema.name = the specific schema for which you want to receive information. In this case, we're looking for data that is mapped against the ExperienceEvent schema. 
* relatedSchema.name = While we're looking for data that is mapped against the ExperienceEvent schema, we need to specify an identity for which we want to receive that data. The schema that has access to identity is the Profile-schema, so the relatedSchema here is the Profile-schema.
* relatedEntityId = the specific customer ID
* relatedEntityIdNS = the specific namespace that is applicable to the ID


So, if you want to ask Platform's API's to give you back all Profile information for your own ecid, you will need to configure the call as follows:

| Key     | Value     | 
|:-------------:| :---------------:| 
| schema.name          | **\_xdm.context.experienceevent** |
| relatedSchema.name          | **\_xdm.context.profile** |
| relatedEntityId          | **yourECID** |
| relatedEntityIdNS    | **ecid** | 

![Adobe IO New Integration](./images/eecallecid.png)

Click "Send" to send your request to Platform.

You should get an immediate response from Platform, showing you something like this:

![Adobe IO New Integration](./images/eecallecidresponse.png)

Below is the full response from Platform. In this example, there are 8 ExperienceEvents linked to this customer's ECID. Have a look at the below to see the different variables on the call, as what you see below is the direct consequence of your configuration in Launch in Modules 1 and 2.

Also, when the X-ray panel shows ExperienceEvent information, it is using the below payload to parse and retrieve the information like Product Name (search for productName in the below payload) and Product Image URL (search for productUrl in the below payload).

```
{
    "_page": {
        "orderby": "timestamp",
        "start": "5035341744235.654",
        "count": 46,
        "next": ""
    },
    "children": [
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "5035341744235.654",
            "timestamp": 1572453413000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "5035341744235.654",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "Admin - Select LDAP"
                    }
                },
                "timestamp": "2019-10-30T16:36:53Z"
            },
            "lastModifiedAt": "2019-10-30T16:36:54Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "4638714151132.943",
            "timestamp": 1572453417000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "4638714151132.943",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "Admin"
                    }
                },
                "timestamp": "2019-10-30T16:36:57Z"
            },
            "lastModifiedAt": "2019-10-30T16:36:57Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "6601680737625.926",
            "timestamp": 1572453417000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "6601680737625.926",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "Admin"
                    }
                },
                "timestamp": "2019-10-30T16:36:57Z"
            },
            "lastModifiedAt": "2019-10-30T16:36:58Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "9421092788294.85",
            "timestamp": 1572453431000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "9421092788294.85",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "La Boutique Home"
                    }
                },
                "timestamp": "2019-10-30T16:37:11Z"
            },
            "lastModifiedAt": "2019-10-30T16:37:12Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "30803879635.22364",
            "timestamp": 1572453448000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "30803879635.22364",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "La Boutique Home"
                    }
                },
                "timestamp": "2019-10-30T16:37:28Z"
            },
            "lastModifiedAt": "2019-10-30T16:37:28Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "2323035584290.1064",
            "timestamp": 1572454993000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "productData": {
                        "productUrl": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/8ff98b6d00fd2f051e717dd20246dc2d_1.jpg",
                        "productName": "El Paso Tank",
                        "productInteraction": "productAddToCart"
                    },
                    "brand": {
                        "brandName": "La Boutique"
                    },
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "web": {
                    "webPageDetails": {
                        "name": "El Paso Tank",
                        "URL": "http://v2.sd.com/p3.html"
                    }
                },
                "_id": "2323035584290.1064",
                "commerce": {
                    "productListAdds": {
                        "value": 1
                    }
                },
                "productListItems": [
                    {
                        "name": "El Paso Tank",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/8ff98b6d00fd2f051e717dd20246dc2d_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "El Paso Tank",
                        "priceTotal": 38
                    }
                ],
                "timestamp": "2019-10-30T17:03:13Z"
            },
            "lastModifiedAt": "2019-10-30T17:03:14Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "3295142445296.708",
            "timestamp": 1572454996000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "productData": {
                        "productUrl": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/73fcf6ff229250151d1b3d4d72a1bd5d_1.jpg",
                        "productName": "Basecamp Tent",
                        "productInteraction": "productAddToCart"
                    },
                    "brand": {
                        "brandName": "La Boutique"
                    },
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "web": {
                    "webPageDetails": {
                        "name": "Basecamp Tent",
                        "URL": "http://v2.sd.com/p4.html"
                    }
                },
                "_id": "3295142445296.708",
                "commerce": {
                    "productListAdds": {
                        "value": 1
                    }
                },
                "productListItems": [
                    {
                        "name": "Basecamp Tent",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/73fcf6ff229250151d1b3d4d72a1bd5d_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "Basecamp Tent",
                        "priceTotal": 649.99
                    }
                ],
                "timestamp": "2019-10-30T17:03:16Z"
            },
            "lastModifiedAt": "2019-10-30T17:03:16Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "2489004895935.574",
            "timestamp": 1572455004000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "productData": {
                        "productInteraction": "productPurchase"
                    },
                    "brand": {
                        "brandName": "La Boutique"
                    },
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "web": {
                    "webPageDetails": {
                        "name": "Purchase Confirmation",
                        "URL": "http://v2.sd.com/purchase.html"
                    }
                },
                "_id": "2489004895935.574",
                "commerce": {
                    "purchases": {
                        "value": 1
                    },
                    "order": {
                        "currencyCode": "EUR",
                        "payments": [
                            {
                                "currencyCode": "EUR",
                                "paymentAmount": 808.99,
                                "transactionID": "608344585",
                                "paymentType": "visa\t"
                            }
                        ],
                        "priceTotal": 808.99,
                        "purchaseOrderNumber": "608344585"
                    }
                },
                "productListItems": [
                    {
                        "name": "Lisette Dress",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/1ab0b25f5c2762069f0c4d9ca90c4970_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "Lisette Dress",
                        "priceTotal": 58
                    },
                    {
                        "name": "Marais Dress",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/334d4c840ff684910a9c152e23fb55bf_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "Marais Dress",
                        "priceTotal": 58
                    },
                    {
                        "name": "El Paso Tank",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/8ff98b6d00fd2f051e717dd20246dc2d_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "El Paso Tank",
                        "priceTotal": 38
                    },
                    {
                        "name": "Basecamp Tent",
                        "product": "https://parsefiles.back4app.com/F6cyZi3EC5FmJz7Lhk31Sdk5vgPQNJ7E3HBVvo3d/73fcf6ff229250151d1b3d4d72a1bd5d_1.jpg",
                        "quantity": 1,
                        "productAddMethod": "Desktop",
                        "SKU": "Basecamp Tent",
                        "priceTotal": 649.99
                    }
                ],
                "timestamp": "2019-10-30T17:03:24Z"
            },
            "lastModifiedAt": "2019-10-30T17:03:25Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "9315357768730.13",
            "timestamp": 1572455010000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "9315357768730.13",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "La Boutique Home"
                    }
                },
                "timestamp": "2019-10-30T17:03:30Z"
            },
            "lastModifiedAt": "2019-10-30T17:03:30Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "6859199387025.387",
            "timestamp": 1572455345000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "6859199387025.387",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "La Boutique Home"
                    }
                },
                "timestamp": "2019-10-30T17:09:05Z"
            },
            "lastModifiedAt": "2019-10-30T17:09:06Z"
        },
        {
            "relatedEntityId": "A28IO1HfCVXoXHv6YqPlUN0o",
            "entityId": "7587424676478.458",
            "timestamp": 1572455601000,
            "entity": {
                "environment": {
                    "browserDetails": {
                        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                        "acceptLanguage": "en"
                    }
                },
                "_tcsamericasptrsd": {
                    "identification": {
                        "ecid": "66946943469759516242944598678589078139"
                    }
                },
                "_id": "7587424676478.458",
                "web": {
                    "webPageDetails": {
                        "pageViews": {
                            "value": 1
                        },
                        "name": "La Boutique Home"
                    }
                },
                "timestamp": "2019-10-30T17:13:21Z"
            },
            "lastModifiedAt": "2019-10-30T17:13:21Z"
        }
    ],
    "_links": {
        "next": {
            "href": ""
        }
    }
}
```

This is currently all of the available ExperienceEvent data in Platform for this ECID.
You're not required to use the ECID to request ExperienceEvent data from Platform's Unified Profile, you can use any ID in any namespace to request this data. 

#### Exercise 2.2.5 - Unified Profile View of the Customer's Golden Record


In Platform there's a new feature that visualizes the entore customer profile. This one feature is what all of our customer's have been trying to get for years: a single view of the customer.

Go to the Platform IU: [https://platform.adobe.com/home](https://platform.adobe.com/home).

In the Platform UI, go to "Profiles".

![Adobe IO New Integration](./images/profiles.png)

By going to the new UI of Platform (not available in Production yet - link will be placed at a later stage), you'll be able to go to "Profiles" and search for a Profile.

![Adobe IO New Integration](./images/findaprofile.png)

By clicking on "Find a Profile", a popup appears in which a namespace and an ID can be entered. 

![Adobe IO New Integration](./images/popup.png)

In this case, I'm taking my ECID, but any other namespace and ID can also be used to retrieve a profile here.

![Adobe IO New Integration](./images/popupecid.png)

By clicking OK, I'll be seeing my full profile.

![Adobe IO New Integration](./images/profile.png)

And by going to the menu option "Experience Events", all of my Experience Events are being shown.

![Adobe IO New Integration](./images/ee.png)

In this single view of the customer, all profile data is shown alongside behavioral and transactional data and the view will also be enriched with existing segment memberships. The data that is shown here come from anywhere, from any Adobe Solution to any external solution. This is the most powerful view of Adobe Experience Platform: the true Experience System of Record.

Congrats for making it all the way here. It's now time to experience Platform's new, unified segmentation environment!

[Next Step: Using the new, Unified Segmentation Experience](../segmentation/README.md)

[Go Back to Module 2](../README.md)

[Go Back to All Modules](/../../)



