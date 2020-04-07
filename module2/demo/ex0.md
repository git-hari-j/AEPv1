### Exercise 2.4.0 - Demo Best Practices

You're working in a real Platform environment with real datasets. From a demo perspective, this impacts what you should do before and/or after every demo.

First and foremost: every time you open a web browser or mobile app and go to the register/login page, an ID-sync is made between your ECID, your email address and your mobile phone number. This is the way Platform is supposed to work so it's expected behaviour, but from a demo perspective this means that if you do a demo and want to tell a story to a customer, you'll have to make sure to always start your demo story with a clean account and environment, which means:

  * **a clean, new email-address**
  * **a clean, new mobile phone number**
  * **a clean, fresh browser environment with a clean ECID**
  * **a clean, new mobile app environment**

Failure to do any of the above means that you will start the demo story with a 'dirty' profile, and as such, your demo story will be influenced in impredictable ways.

#### Tips

  * Use Chrome as the web browser: it's your best option to demo as it has the least amount of blocked features around cookies
  * Always demo in "Incognito Mode"


#### Step 1 - Clean, fresh profile

For every demo, you need to use a new customer profile that is clean and fresh. This means that before every demo, you'll have to think before you demo and define your identifiers before you start the demo. Also, this is a shared demo environment so we also need to think about not polluting or impacting our colleagues' demo's.

As a best practice, please do the following:

  * Email Address identifier: **ldap**+**DDMMYY**-**number**@adobe.com
  * Mobile Nr identifier: **yourmobilenumber**+**DDMMYY**-**number**

As an example, for the ldap "vangeluw":
On Monday February 25 2019, this should be the first set of identifiers of the day.
  
  * Email Address identifier: **vangeluw**+**250219**-**1**@adobe.com
  * Mobile Nr identifier: **0473622044**+**250219**-**1**

We'll try to find a better mechanism, but for now, please respect this convention.

#### Step 2 - Desktop

Things to do before starting a new demo on a desktop computer:

  * Manually quit your browser (you have to manually quit the browser like this, otherwise your cookies/identifiers in Incognito Mode aren't always reset)
  
  ![Demo](./images/quit.png)
  
  * Start a New Incognito Window

  ![Demo](./images/incognito.png)
  
  * Go to the La Boutique hompage and open the X-ray panel to check if the profile is clean.
  
  ![Demo](./images/xrayclean.png)

#### Step 3 - Mobile App

Things to do before starting a new demo on your iPhone:

  * If the AEP IBM EMEA mobile app was already installed, delete it.

  ![Demo](./images/deleteapp.png)
  
  * Go to TestFlight on your iPhone and reinstall the IBM EMEA mobile app.

  ![Demo](./images/tf_install.png)
  
  * Open the La Boutique mobile app
  
  * Click "Allow While Using App" to allow La Boutique to access your location. The La Boutique app will be used in the future in combination with iBeacons and to fully take advantage of these iBeacons, La Boutique always needs to be able to access your location.

  ![Demo](./images/allow1.png)
  
  * Click "Allow" to allow La Boutique to send you notifications. Push notifications will be used at a later stage to show personalized messages.

  ![Demo](./images/allow2a.png)
  
  * Click "OK" to allow La Boutique to use Bluetooth.

  ![Demo](./images/allow3a.png)
  
  * Click "Next".

  ![Demo](./images/allow4a.png)
  
  * Click "Start Testing".

  ![Demo](./images/allow5a.png)

With this information, you're now ready to go into the demo walktrough.

[Next Step: From unknown to known on the La Boutique website](./ex1.md)

[Go Back to Module 2](../README.md)

[Go Back to All Modules](/../../)



