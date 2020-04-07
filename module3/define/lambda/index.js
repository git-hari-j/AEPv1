// includes
const main = require('./apl/main.json');
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');
const Alexa = require('ask-sdk-core');
const Parse = require('parse/node');

// global variables
var selectedProduct;
var ldap;
var brandId;
var alexaBrandName;
var brandName;
var brandLogoImage;
var brandHeroImage = "https://parsefiles.back4app.com/hgJBdVOS2eff03JCn6qXXOxT5jJFzialLAHJixD9/37a2ceb4716f2c7e36b89a0c32b5b5fa_image2.jpg";
var emailAddress;
var realAlexaDeviceUse;


/* ALEXA HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    var speechText = '';
    Parse.serverURL = process.env.serverURL;
    Parse.initialize(
      process.env.applicationId,
      process.env.javascriptKey,
      '8ozAapmgIMiGAoIR8HCTiWvq5X7VwnXgnrJre0wM' // we don't want to expose masterkey as configuration!
    )

    console.log("User name: " + process.env.username);
    console.log("Company: " + process.env.company);

    // check whether environment is setup for real device use
    if (process.env.ldap && process.env.alexaBrandName && process.env.emailAddress) {
      realAlexaDeviceUse = true;
      ldap = process.env.ldap;
      emailAddress = process.env.emailAddress;
      alexaBrandName = process.env.alexaBrandName.toLocaleLowerCase();
      const brands = await b4aGetBrands(alexaBrandName);
      var brand = brands[0];
      brandId = brand.get("brandId");
      brandName = brand.get("brandName"); 
      brandLogoImage = brand.get("brandLogo"); 
      // brandHeroImage = brand.get("brandHeroImage");  
      speechText = 'Welcome to the Adobe Experience Platform skill for Alexa. The skill is ready for immediate use on a real device. Say, Alexa, help, to get more information on how to use this skill!';
      console.log('Environment variables set => ldap: ' + ldap + ', brand: ' + brand.get('brandName') + ', brand id: ' + brandId + ', email address ' + emailAddress);

      // get brand id based on environment variable for brandName
    }
    else {
      realAlexaDeviceUse = false;
      speechText = 'Welcome to the Adobe Experience Platform skill for Alexa.';
    }

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome to Adobe Experience Plafform' , speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: main.document,
          datasources: main.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome to Adobe Experience Plafform' , speechText)
        .getResponse();
    }
  }
};

const HelloIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello Adobe Experience Platform skill for ' + process.env.company;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello ' + process.env.company, speechText)
      .getResponse();
  }
};

const LdapIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LdapIntent';
  },
  async handle(handlerInput) {
    var ldapJson = JSON.parse(fs.readFileSync('./apl/ldap.json', 'utf-8'));
    ldap = handlerInput.requestEnvelope.request.intent.slots.ldap.value;
    console.log("LDAP: " + ldap);
    var speechText = '';

    if (ldap) {
      console.log("We think ldap is defined...");
      // now check for additional brands
      const ldaps = await b4aLdap(ldap);
      if (ldaps.length > 0) {
        console.log("Response: " + ldaps);
        speechText = 'Great, you are logged in as ' + ldap + '...';
        ldapJson.datasources.bodyTemplate2Data.textContent.title.text = ldap;
        ldapJson.datasources.bodyTemplate2Data.textContent.primaryText.text = speechText; 
      }
      else {
        speechText = 'Sorry, we cannot find that LDAP user...';
        ldapJson.datasources.bodyTemplate2Data.textContent.title.text = "Unknown user";
        ldapJson.datasources.bodyTemplate2Data.textContent.primaryText.text = speechText; 
      }
    }
    else {
      speechText = 'Ok, we continue using a default configuration...';
      ldapJson.datasources.bodyTemplate2Data.textContent.title.text = "No LDAP configured";
      ldapJson.datasources.bodyTemplate2Data.textContent.primaryText.text = speechText; 
    }

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: ldapJson.document,
          datasources: ldapJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .getResponse();
    }
  }
};

const UseBrandIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'UseBrandIntent';
  },
  async handle(handlerInput) {
    const slotBrandValue = handlerInput.requestEnvelope.request.intent.slots.brand.value;
    console.log("Brand slot value: " + slotBrandValue);
    var selectedBrandJson = JSON.parse(fs.readFileSync('./apl/selectedbrand.json', 'utf-8'));
    const brands = await b4aGetBrands(slotBrandValue.toLowerCase());
    var brand = brands[0];
    brandId = brand.get("brandId");
    brandName = brand.get("brandName");
    brandLogoImage = brand.get("brandLogo");
    // brandHeroImage = brand.get("brandHeroImage");
    console.log("Brand Id: " + brandId);
    var speechText = 'You have selected a valid brand for the Adobe Experience Platform skill.';
    if (brand.get('ldap') === 'all' || brand.get('ldap') === ldap) {
      console.log("You are allowed to use the brand " + brandName);
    }
    else {
      console.log("You are not allowed to use the brand " + brandName);
      speechText = 'You have no permission to use the selected brand for the Adobe Experience Platform skill.';
      brandId = null;
    }
    selectedBrandJson.datasources.bodyTemplate2Data.textContent.title.text = brand.get("brandName");
    selectedBrandJson.datasources.bodyTemplate2Data.textContent.primaryText.text = speechText; 

    console.log("After updating brand name...");

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: selectedBrandJson.document,
          datasources: selectedBrandJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .getResponse();
    }
  }
}

const UseEmailAddressIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'UseEmailAddressIntent';
  },
  async handle(handlerInput) {
    const slotEmailAddressValue = handlerInput.requestEnvelope.request.intent.slots.emailAddress.value;
    console.log("Email Address: " + slotEmailAddressValue);
    emailAddress = slotEmailAddressValue;
    var atpos = emailAddress.lastIndexOf(' ');
    if (atpos > 0) emailAddress = emailAddress.substring(0,atpos) + '@' + emailAddress.substring(atpos+1);
    /*
    var minuspos = emailAddress.lastIndexOf(' ');
    if (minuspos > 0) emailAddress = emailAddress.substring(0,minuspos) + '-' + emailAddress.substring(minuspos+1);
    */
    var pluspos = emailAddress.lastIndexOf(' ');
    if (pluspos > 0) emailAddress = emailAddress.substring(0,pluspos) + '+' + emailAddress.substring(pluspos+1);

    var useEmailAddressJson = JSON.parse(fs.readFileSync('./apl/useemailaddress.json', 'utf-8'));

    // might need to validate email address...

    var speechText = 'You will use ' + emailAddress + ' as the email address for the Adobe Experience Platform skill.';
    useEmailAddressJson.datasources.bodyTemplate2Data.textContent.title.text = emailAddress;
    useEmailAddressJson.datasources.bodyTemplate2Data.textContent.primaryText.text = speechText; 
  
    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: useEmailAddressJson.document,
          datasources: useEmailAddressJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome...', speechText)
        .getResponse();
    }
  }
}

const GetProductsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetProductsIntent';
  },
  async handle(handlerInput) {
    const products = await b4aGetProducts(brandId);
    console.log("We found " + products.length + " products...");
    var productsJson = JSON.parse(fs.readFileSync('./apl/products.json', 'utf-8'));
    for (var i = 0; i < products.length; i++) {
      var productJson = JSON.parse(fs.readFileSync('./apl/product.json', 'utf-8'));
      var product = products[i];
      console.log("At product " + i + " with product name " + product.get("name"));
      productJson.listItemIdentifier = product.get("objectId");
      productJson.token = product.get("objectId");
      productJson.textContent.primaryText.text = product.get("name");
      productJson.textContent.secondaryText.text = product.get("category");
      productJson.ordinalNumber = i + 1;
      var productImage1 = product.get("image1");
      productJson.image.sources[0].url = productImage1.url();
      //var productImage2 = product.get("image2");
      // productJson.image.sources[1].url = productImage1.url();
      productsJson.datasources.listTemplate2ListData.listPage.listItems.push(productJson);
    }
    productsJson.datasources.listTemplate2ListData.totalNumberOfItems = products.length;
    productsJson.datasources.listTemplate2Metadata.title = 'Products for ' + brandName + ':';
    productsJson.datasources.listTemplate2Metadata.backgroundImage.sources[0].url = brandHeroImage; 
    productsJson.datasources.listTemplate2Metadata.backgroundImage.sources[1].url = brandHeroImage;
    productsJson.datasources.listTemplate2Metadata.logoUrl = brandLogoImage.url();

    console.log("Finished creating the JSON for the skill visual...");
    console.log("The final products JSON is:\n" + JSON.stringify(productsJson));


    const speechText = "We got " + products.length + " products. Use a number between 1 and " + products.length + " to get more details about a product. E.g. say Alexa, get product 8";

    if (deviceHasDisplay(handlerInput)) {
      console.log("About to display on Alexa...");
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome to ' + brandName + '...', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: productsJson.document,
          datasources: productsJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Welcome to ' + brandName + '...', speechText)
        .getResponse();
    }
  }
};


const GetProductIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetProductIntent';
  },

  async handle(handlerInput) {
    var currencyText = "euros";
    const products = await b4aGetProducts(brandId);
    var productId = handlerInput.requestEnvelope.request.intent.slots.productId.value;
    console.log("Slot value is " + productId);
    selectedProduct = products[productId - 1];

    var productViewJson = JSON.parse(fs.readFileSync('./apl/productview.json', 'utf-8'));
    productViewJson.datasources.bodyTemplate3Data.title = "Product View";
    productViewJson.datasources.bodyTemplate3Data.textContent.title.text = selectedProduct.get("name");
    var productImage = selectedProduct.get("image1");
    productViewJson.datasources.bodyTemplate3Data.image.sources[0].url = productImage.url();
    productViewJson.datasources.bodyTemplate3Data.image.sources[1].url = productImage.url();
    productViewJson.datasources.bodyTemplate3Data.textContent.subtitle.text = selectedProduct.get("category");
    var description = selectedProduct.get('description');
    productViewJson.datasources.bodyTemplate3Data.textContent.primaryText.text = description.replace(/\n/g,' ');
    productViewJson.datasources.bodyTemplate3Data.textContent.bulletPoint.text = selectedProduct.get("currency") + " " + selectedProduct.get("finalPrice");
    productViewJson.datasources.bodyTemplate3Data.backgroundImage.sources[0].url = brandHeroImage;
    productViewJson.datasources.bodyTemplate3Data.backgroundImage.sources[1].url = brandHeroImage;
    productViewJson.datasources.bodyTemplate3Data.logoUrl = brandLogoImage.url();

    console.log("Finished creating the JSON for the skill visual...");
    console.log("The final productView JSON is:\n" + JSON.stringify(productViewJson));

    if (selectedProduct.get("currency") === 'EUR') currencyText = "euro"; else currencyText = "dollar";
    const speechText = 'You have selected ' + selectedProduct.get("name") + ' from the category ' + selectedProduct.get("category") + ' with a price of ' + selectedProduct.get("finalPrice") + " " + currencyText + '. You can add the product to your shopping cart by saying Alexa, add product to cart';

    // send the experience event
    sendExperienceEvent(selectedProduct, "productView");

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Product View', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: productViewJson.document,
          datasources: productViewJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Product View', speechText)
        .getResponse();
    }
  }
};

const AddProductToCartIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddProductToCartIntent';
  },

  handle(handlerInput) {
    const speechText = 'We have added  ' + selectedProduct.get("name") + ' to your shopping cart. Thank you!';

    var addProductToCartJson = JSON.parse(fs.readFileSync('./apl/addproducttocart.json', 'utf-8'));
    addProductToCartJson.datasources.bodyTemplate1Data.textContent.primaryText.text = speechText;
    addProductToCartJson.datasources.bodyTemplate1Data.title = "Add Product To Cart";
    addProductToCartJson.datasources.bodyTemplate1Data.textContent.primaryText.text = speechText;
    addProductToCartJson.datasources.bodyTemplate1Data.backgroundImage.sources[0].url = brandHeroImage;
    addProductToCartJson.datasources.bodyTemplate1Data.backgroundImage.sources[1].url = brandHeroImage;
    addProductToCartJson.datasources.bodyTemplate1Data.logoUrl = brandLogoImage.url();

    // send the experience event
    sendExperienceEvent(selectedProduct, "productAddToCart");

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Add to Cart', speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: addProductToCartJson.document,
          datasources: addProductToCartJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Add To Cart', speechText)
        .getResponse();
    }
  }
};

const PurchaseProductIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PurchaseProductIntent';
  },

  handle(handlerInput) {
    const speechText = 'You have purchased  ' + selectedProduct.get("name") + '. Thank you so much!';

    var purchaseProductJson = JSON.parse(fs.readFileSync('./apl/purchaseproduct.json', 'utf-8'));
    purchaseProductJson.datasources.bodyTemplate1Data.textContent.primaryText.text = speechText;
    purchaseProductJson.datasources.bodyTemplate1Data.title = "Purchase Product";
    purchaseProductJson.datasources.bodyTemplate1Data.textContent.primaryText.text = speechText;
    purchaseProductJson.datasources.bodyTemplate1Data.backgroundImage.sources[0].url = brandHeroImage; 
    purchaseProductJson.datasources.bodyTemplate1Data.backgroundImage.sources[1].url = brandHeroImage;  
    purchaseProductJson.datasources.bodyTemplate1Data.logoUrl = brandLogoImage.url();

    sendExperienceEvent(selectedProduct, "productPurchase");

    if (deviceHasDisplay(handlerInput)) {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Purchase' , speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.0',
          document: purchaseProductJson.document,
          datasources: purchaseProductJson.datasources
        })
        .getResponse();
    }
    else {
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Purchase', speechText)
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    var speechText = '';

    if (realAlexaDeviceUse) speechText = 'First Say Alexa, get products to load all products, then say Alexa, get product followed by a number to get details about a specific product. After this you can say Alexa, add to cart to add the selected product to the shopping cart. And then say Alexa, purchase to purchase the selected product.';
    else speechText = 'Use the Alexa simulator to login with your ldap account, to specify which brand to use and to specify your email address to use. Then you can get all products, select a specific product, add the product to the shopping cart and purchase the product.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Help for Adobe Experience Platform skill', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye! We hope you have enjoyed using the Adobe Experience Platform skill...';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ConfirmTouchIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request; // Was this a touch item selected?    
    console.log("Event request type: " + request.type);
    if (request.type === 'Alexa.Presentation.APL.UserEvent') {
      return (request.source.type === 'TouchWrapper');
    }
    return false;
  },
  async handle(handlerInput) {
    const event = handlerInput.requestEnvelope; // Was this a touch item selected?   
    if (event.request.type === 'Alexa.Presentation.APL.UserEvent') {
      var currencyText = "euros";
      const products = await b4aGetProducts(brandId);
      var productId = event.request.arguments[0];
      console.log("We touched product with id: " + productId);

      selectedProduct = products[productId - 1];

      var productViewJson = JSON.parse(fs.readFileSync('./apl/productview.json', 'utf-8'));
      productViewJson.datasources.bodyTemplate3Data.title = selectedProduct.get("name");
      productViewJson.datasources.bodyTemplate3Data.textContent.title.text = selectedProduct.get("name");
      var productImage = selectedProduct.get("image1");
      productViewJson.datasources.bodyTemplate3Data.image.sources[0].url = productImage.url();
      productViewJson.datasources.bodyTemplate3Data.image.sources[1].url = productImage.url();
      productViewJson.datasources.bodyTemplate3Data.textContent.subtitle.text = selectedProduct.get("category");
      var description = selectedProduct.get('description');
      productViewJson.datasources.bodyTemplate3Data.textContent.primaryText.text = description.replace(/\n/g, ' ');
      productViewJson.datasources.bodyTemplate3Data.textContent.bulletPoint.text = selectedProduct.get("currency") + " " + selectedProduct.get("finalPrice");
      productViewJson.datasources.bodyTemplate3Data.backgroundImage.sources[0].url = brandHeroImage; 
      productViewJson.datasources.bodyTemplate3Data.backgroundImage.sources[1].url = brandHeroImage;  
      productViewJson.datasources.bodyTemplate3Data.logoUrl = brandLogoImage.url();

      console.log("Finished creating the JSON for the skill visual...");
      console.log("The final productView JSON is:\n" + JSON.stringify(productViewJson));

      if (selectedProduct.get("currency") === 'EUR') currencyText = "euro"; else currencyText = "dollar";
      const speechText = 'You have selected ' + selectedProduct.get("name") + ' from the category ' + selectedProduct.get("category") + ' with a price of ' + selectedProduct.get("finalPrice") + " " + currencyText + '. You can add the product to your shopping cart by saying Alexa, add product to cart';

      // send the experience event
      sendExperienceEvent(selectedProduct, "productView");

      if (deviceHasDisplay(handlerInput)) {
        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Product View', speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: productViewJson.document,
            datasources: productViewJson.datasources
          })
          .getResponse();
      }
      else {
        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Product View', speechText)
          .getResponse();
      }
    }
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloIntentHandler,
    LdapIntentHandler,
    UseBrandIntentHandler,
    UseEmailAddressIntentHandler,
    GetProductsIntentHandler,
    GetProductIntentHandler,
    AddProductToCartIntentHandler,
    PurchaseProductIntentHandler,
    HelpIntentHandler,
    ConfirmTouchIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();



/* Back4App Functions */
function b4aLogin(userName) {
  return new Promise(((resolve, reject) => {
    Parse.User.logIn(userName, process.env.password).then((user) => {
      // Do stuff after successful login
      if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
      console.log('Logged in user', user);
      resolve(user);
    }).catch(error => {
      if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user', error);
      // reject(error);
      reject(error)
    })
  }))
};

function b4aLdap(ldap) {
  console.log("Within b4aLdap()");
  return new Promise(((resolve, reject) => {
    const ldaps = Parse.Object.extend("LDAP");
    const query = new Parse.Query(ldaps);
    query.equalTo("ldap", ldap);
    query.find().then((results) => {
      console.log('LDAP entry found:', results);
      resolve(results);
    }, (error) => {
      console.error('LDAP entry not found', error);
      reject(error);
    });
  }))
};

function b4aGetBrand(ldap) {
  console.log("Within b4aGetBrand()");
  return new Promise(((resolve, reject) => {
    const brands = Parse.Object.extend("Brand");
    const query = new Parse.Query(brands);
    query.equalTo("ldap", ldap);
    query.find().then((results) => {
      console.log('Brands for LDAP ' + ldap + ' found:', results);
      resolve(results);
    }, (error) => {
      console.error('No brands found', error);
      reject(error);
    });
  }))
}

function b4aGetBrands(alexaBrandName) {
  console.log("Within b4aGetBrands()");
  return new Promise(((resolve, reject) => {
    const brands = Parse.Object.extend("Brand");
    const query = new Parse.Query(brands);
    query.equalTo("alexaBrandName", alexaBrandName);
    query.find().then((results) => {
      console.log('Brand details for ' + alexaBrandName + ' found:', results);
      resolve(results);
    }, (error) => {
      console.error('No brand found', error);
      reject(error);
    });
  }))
}

function b4aGetUserNames() {
  console.log("Within b4aGetUserNames()");
  return new Promise(((resolve, reject) => {
    const UserLogins = Parse.Object.extend("User");
    const query = new Parse.Query(UserLogins);
    query.distinct("username");
    query.greaterThan("updatedAt", moment().subtract(14, 'days').toDate());
    query.descending("updatedAt");
    query.limit(20);
    query.find().then((results) => {
      console.log('User Names found:', results);
      resolve(results);
    }, (error) => {
      console.error('Error while fetching user names', error);
      resolve(error);
    });
  }))
};

function b4aGetProducts(brandId) {
  console.log("Within b4aGetProducts()");
  return new Promise(((resolve, reject) => {
    const Products = Parse.Object.extend('Products');
    const query = new Parse.Query(Products);
    query.equalTo("brandId", brandId);
    // query.notEqualTo("name", "");
    console.log("About to fire the query b4aGetProducts for brandId..." + brandId);
    query.find().then((results) => {
      // You can use the "get" method to get the value of an attribute
      // Ex: response.get("<ATTRIBUTE_NAME>")
      if (typeof document !== 'undefined') document.write(`Products found: ${JSON.stringify(results)}`);
      console.log('Products found:', results);
      resolve(results);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while fetching Products: ${JSON.stringify(error)}`);
      console.error('Error while fetching Products', error);
      reject(error);
    });
  }))
};

function deviceHasDisplay(handlerInput) {
  var result =
    handlerInput &&
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.hasOwnProperty('Alexa.Presentation.APL');
  return result;
};

function sendExperienceEvent(selectedProduct, interaction) {
  var experienceEventJson = JSON.parse(fs.readFileSync('./event/experienceevent.json', 'utf-8'));
  var productImage1 = selectedProduct.get("image1");
  experienceEventJson.body.xdmEntity._id = moment().format('x');
  experienceEventJson.body.xdmEntity.timestamp = moment().format('YYYY-MM-DDTHH:mm:ss') + "Z";
  experienceEventJson.body.xdmEntity.productListItems[0].SKU = selectedProduct.get("name");
  experienceEventJson.body.xdmEntity.productListItems[0].priceTotal = selectedProduct.get("finalPrice");
  experienceEventJson.body.xdmEntity.productListItems[0].quantity = 1;
  experienceEventJson.body.xdmEntity.productListItems[0].name = selectedProduct.get("name");
  experienceEventJson.body.xdmEntity.productListItems[0].product = productImage1.url();
  experienceEventJson.body.xdmEntity.productListItems[0].productAddMethod = "Alexa";
  experienceEventJson.body.xdmEntity._tcsamericasptrsd.productData.productUrl = productImage1.url();
  experienceEventJson.body.xdmEntity._tcsamericasptrsd.productData.productName = selectedProduct.get("name");
  experienceEventJson.body.xdmEntity._tcsamericasptrsd.productData.productInteraction = interaction;
  experienceEventJson.body.xdmEntity._tcsamericasptrsd.identification.emailId = emailAddress;
  console.log("Finished creating the JSON for sending as an experience event");
  console.log("The final experience event JSON is:\n" + JSON.stringify(experienceEventJson));

  axios.post(process.env.experienceEventPostbackURL, experienceEventJson).then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  }).catch((error) => {
    console.error(error)
  });
}

function firstLetterToUpperCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}