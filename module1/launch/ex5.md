## Exercise 1.2.5 - Configure Launch Rules

After creating the extensions and data elements, it's time to build our Rules.

Go to [https://launch.adobe.com/](https://launch.adobe.com/) and login with your personal login details.

#### Exercise 1.2.5.1 - Rule: All General Pages

In the Launch menu, go to Rules and click on "Create New Rule".

![Launch Setup](./images/rules.png)

Our first rule will fire on All General Pages.
As a name for this rule, let's use "All General Pages".

![Launch Setup](./images/newrule.png)

We need to configure an Event to trigger this rule, so let's click on the + icon to Add an Event.

![Launch Setup](./images/addevent.png)

Our rule should fire on all pages, when the page has completely loaded.

| Extension     | Event Type       | Name             |
|:-------------:| :---------------:| :--------------: |
| Core          | Core - DOM Ready | Core - DOM Ready |

![Launch Setup](./images/eventdom.png)

Click "Keep Changes" to save your Event Configuration.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Now we need to add a condition so that this Rule only fires on the General Pages. Click on the + icon to add a Condition

![Launch Setup](./images/addcond.png)

Our rule should only fire on the General pages, so we're reading out the Site Section information from the datalayer and are comparing it to find the pages that are classified as General.

| Logic Type    | Extension     | Condition Type       | Name             | Return true if       | Equals |
|:-------------:|:-------------:| :-------------------:| :--------------: | :------------------------------: | :-----------: |
| Regular       | Core          | Value Comparison             | Core - Value Comparison  | %pageType% | General      |

![Launch Setup](./images/condition.png)

Click "Keep Changes" to save your Event Condition.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

After the Event and Condition, we can now define Actions to be taken.

To add an action, click on the + icon.

Our first action will be to send the beacon to Platform, by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Experience Platform   | Send Beacon      | Adobe Experience Platform - Send Beacon |

After selecting the Platform - Send Beacon option, a dataset needs to be selected. In Exercise 1.2.4, we defined the 2 datasets to use:

* Website Interaction Dataset name: 
  
  * **Website Interactions (API)**

* Website Registration name: 
  
  * **Website Registration Information (API)**

In this case, we need to select the Website Interactions (API) - dataset from the dropdown-list.

![Launch Setup](./images/beaconconfig.png)

In Schema Mapping, there's a visual way of selecting XDM-fields. By clicking on this icon:

![Launch Setup](./images/ds_viz.png) 

With a click on that icon, you're able to open up the XDM Schema that is linked to the dataset **Website Interactions  (API)**.

![Upgrade Launch](./images/xdmselector.png)

In Schema Mapping, You need to add the following Keys and Values to the Send Beacon-action:

| Source Value                 | Target Schema Field               |
|:-------------------------------------------| :------------------ |
|%pageHitId%|_id| 
|%pageName%|web.webPageDetails.name|
|%pageTimeStamp%|timestamp|
|%pageUserAgent%|environment.browserDetails.userAgent|
|%customerLanguage%|environment.browserDetails.acceptLanguage|
|%customerECID%|_tcsamericasptrsd.identification.ecid|

![Upgrade Launch](./images/app_ok.png)

Attention! Check your configuration of the Keys to be sure that after copying, no extra spaces are added in the keys as this will generate errors in Platform.

Click "Keep Changes" to save your Action.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Our second action for this rule will be the configuration of the Adobe Analytics-beacon. 

To be clear: there is no functional reason to configure both a Platform-beacon together with an AA-beacon. Technically, both beacons will fire at the same time and will send the same data to Platform.
Since this is an enablement exercise, we're implementing both options just to show the 2 concepts. With the Platform-beacon, we're manually configuring the Key/Value pairs and sending them in a JSON payload to Platform's streaming endpoint as you've seen in the previous step.
With the AA-beacon, we're sending page view data directly to Adobe Analytics, which will then forward that data to Platform.
With our configuration, the same data will be sent twice.

To configure the AA-beacon, you need to add an action to this rule by clicking the + button and by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Analytics             | Set Variables    | Adobe Analytics - Set Variables         |

![Launch Setup](./images/aasetv.png)

The following variables need to be configured here:

| Key               | Value             |
|:------------------| :---------------- |
| eVar1             | %customerECID%    | 
| Page Name         | %pageName%        |
| Page URL          | %pageUrl%         |

![Launch Setup](./images/evars.png)
![Launch Setup](./images/pagev.png)

Click "Keep Changes" to save your Action.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Our third action for this All General Pages-rule will be the sending of the Adobe Analytics-beacon. 
To send the AA-beacon, you need to add an action to this rule by clicking the + button and by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Analytics             | Send Beacon      | Adobe Analytics - Send Beacon           |

![Launch Setup](./images/aasend.png)

Click "Keep Changes" to save your Action.

Click "Save" to save your Rule Configuration.


#### Exercise 1.2.5.2 - Rule: All Product Pages

In the Launch menu, go to Rules and click on "Add Rule".

![Launch Setup](./images/addrule.png)

Our second rule will fire on all product pages.
As a name for this rule, let's use "All Product Pages".

![Launch Setup](./images/pprule.png)

We need to configure an Event to trigger this rule, so let's click on the + icon to Add an Event.

![Launch Setup](./images/addevent.png)

Our rule should fire on all pages, when the page has completely loaded.

| Extension     | Event Type       | Name             |
|:-------------:| :---------------:| :--------------: |
| Core          | Core - DOM Ready | Core - DOM Ready |

![Launch Setup](./images/eventdom.png)

Click "Keep Changes" to save your Event Configuration.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Now we need to add a condition so that this Rule only fires on the Product Pages. Click on the + icon to add a Condition

![Launch Setup](./images/addcond.png)

Our rule should only fire on the Product pages, so we're reading out the Site Section information from the datalayer and are comparing it to find the pages that are classified as Products.

| Logic Type    | Extension     | Condition Type       | Name             | Return true if       | Equals |
|:-------------:|:-------------:| :-------------------:| :--------------: | :------------------------------: | :-----------: |
| Regular       | Core          | Value Comparison             | Core - Value Comparison  | %pageType% | Products      |

![Launch Setup](./images/pcondition.png)

Click "Keep Changes" to save your Event Condition.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

After the Event and Condition, we can now define Actions to be taken.

To add an action, click on the + icon.

Our first action will be to send the beacon to Platform, by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Experience Platform   | Send Beacon      | Adobe Experience Platform - Send Beacon |

After selecting the Platform - Send Beacon option, a dataset needs to be selected. In Exercise 1.2.4, we defined the 2 datasets to use:

* Website Interaction Dataset name: 
  
  * **Website Interactions (API)**

* Website Registration name: 
  
  * **Website Registration Information (API)**

In this case, we need to select the Website Interactions (API) - dataset from the dropdown-list.

![Launch Setup](./images/beaconconfig.png)

In Schema Mapping, there's a visual way of selecting XDM-fields. By clicking on this icon:

![Launch Setup](./images/ds_viz.png) 

With a click on that icon, you're able to open up the XDM Schema that is linked to the dataset **Website Interactions  (API)**.

![Upgrade Launch](./images/xdmselector.png)

In Schema Mapping, You need to add the following Keys and Values to the Send Beacon-action:

| Source Value                 | Target Schema Field               |
|:-------------------------------------------| :------------------ |
|%pageHitId%|_id| 
|%pageName%|web.webPageDetails.name|
|%pageTimeStamp%|timestamp|
|%pageUserAgent%|environment.browserDetails.userAgent|
|%customerLanguage%|environment.browserDetails.acceptLanguage|
|%customerECID%|_tcsamericasptrsd.identification.ecid|
|%productName%|productListItems[0].SKU|
|%productImageUrl%|_tcsamericasptrsd.productData.productUrl|
|%productName%|_tcsamericasptrsd.productData.productName|
|%productInteraction%|_tcsamericasptrsd.productData.productInteraction|

![Upgrade Launch](./images/appp_ok.png)

Attention! Check your configuration of the Keys to be sure that after copying, no extra spaces are added in the keys as this will generate errors in Platform.

Click "Keep Changes" to save your Action.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Our second action for this rule will be the configuration of the Adobe Analytics-beacon. 

To configure the AA-beacon, you need to add an action to this rule by clicking the + button and by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Analytics             | Set Variables    | Adobe Analytics - Set Variables         |

![Launch Setup](./images/aasetv.png)

The following variables need to be configured here:

**eVars**

| Key               | Value             |
|:------------------| :---------------- |
| eVar1             | %customerECID%    | 
| eVar11            | %productPrice%    |
| eVar12            | %productCategory% |
| eVar13            | %productName%     |
| eVar14            | %productImageUrl% |
| eVar15            | %productInteraction% |
| eVar16            | %brandName% |

![Launch Setup](./images/pevars.png)

**Events**

| Key               | 
|:------------------| 
| prodView          |   

![Launch Setup](./images/pevent.png)

**Other**

| Key               | Value             |
|:------------------| :---------------- |
| Page Name         | %pageName%        |
| Page URL          | %pageUrl%         |

![Launch Setup](./images/pother.png)

Scroll down until you see the "Open Editor"-button.

![Launch Setup](./images/oe.png)

Click the "Open Editor"-button.

![Launch Setup](./images/openeditor.png)

Enter the following code in the "Open Editor"-window:

```s.products=";"+_satellite.getVar('productName');```

You're doing this because we need to capture the fact that a customer has viewed this product. By adding the above code, we're informing Adobe Analytics that this is the specific product that was viewed by the customer.

![Launch Setup](./images/customcode.png)

Click "Save" to save your changes to the custom code.

Click "Keep Changes" to save your Action.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Our third action for this All Product Pages-rule will be the sending of the Adobe Analytics-beacon. 
To send the AA-beacon, you need to add an action to this rule by clicking the + button and by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Analytics             | Send Beacon      | Adobe Analytics - Send Beacon           |

![Launch Setup](./images/aasend.png)

Click "Keep Changes" to save your Action.

Click "Save" to save your Rule Configuration.


#### Exercise 1.2.5.3 - Rule: All Authenticated Pages

In the Launch menu, go to Rules and click on "Add Rule".

![Launch Setup](./images/addrule.png)

Our third rule will fire on all authenticated pages and will send Profile data to Platform.
As a name for this rule, let's use "All Authenticated Pages".

![Launch Setup](./images/authp.png)

We need to configure an Event to trigger this rule, so let's click on the + icon to Add an Event.

![Launch Setup](./images/addevent.png)

Our rule should fire on all pages, at the top of the page.

| Extension     | Event Type       | Name             | Order |
|:-------------:| :---------------:| :--------------: | :--------------: |
| Core          | Library Loaded (Page Top) | Core - Library Loaded (Page Top) | 10 |

![Launch Setup](./images/eventtop.png)

Click "Keep Changes" to save your Event Configuration.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Now we need to add a condition so that this Rule only fires on the Product Pages. Click on the + icon to add a Condition

![Launch Setup](./images/addcond.png)

Our rule should only fire on pages where a customer is authenticated, so we're reading out the LoggedIn information from the datalayer and are comparing it to find the moment when a customer is Authenticated.

| Logic Type    | Extension     | Condition Type       | Name                     | Return true if     | Equals |
|:-------------:|:-------------:| :-------------------:| :----------------------: | :----------------: | :----: |
| Regular       | Core          | Value Comparison     | Core - Value Comparison  | %customerLoggedIn% | Yes    |

![Launch Setup](./images/authcond.png)

Click "Keep Changes" to save your Event Condition.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

After the Event and Condition, we can now define Actions to be taken.

To add an action, click on the + icon.

Our first action will be to send the beacon to Platform, by configuring the options as follows:

| Extension                   | Action Type      | Name                                    |
|:---------------------------:| :---------------:| :-------------------------------------: |
| Adobe Experience Platform   | Send Beacon      | Adobe Experience Platform - Send Beacon |

After selecting the Platform - Send Beacon option, a dataset needs to be selected. In Exercise 1.2.4, we defined the 2 datasets to use:

* Website Interaction Dataset name: 
  
  * **Website Interactions (API)**

* Website Registration name: 
  
  * **Website Registration Information (API)**

In this case, we need to select the Website Registration Information (API) - dataset from the dropdown-list.

![Launch Setup](./images/authbeaconconfig.png)

In Schema Mapping, there's a visual way of selecting XDM-fields. By clicking on this icon:

![Launch Setup](./images/ds_viz.png) 

With a click on that icon, you're able to open up the XDM Schema that is linked to the dataset **Website Registration Information (API)**.

![Upgrade Launch](./images/xdmselectorp.png)

In Schema Mapping, You need to add the following Keys and Values to the Send Beacon-action:

| Source Value                                        | Target Schema Field               |
|:-------------------------------------------| :------------------ |
|%customerFirstName%|person.name.firstName|
|%customerLastName%|person.name.lastName|
|%customerEmail%|personalEmail.address|
|%customerEmail%|_tcsamericasptrsd.identification.emailId|
|%customerECID%|_tcsamericasptrsd.identification.ecid|
|%pageTimeStamp%|\_repo.createDate|


![Launch Setup](./images/authvariableconfig.png)

Attention! Check your configuration of the Keys to be sure that after copying, no extra spaces are added in the keys as this will generate errors in Platform.

Click "Keep Changes" to save your Action.

(If you plan on taking a pause here, don't forget to click "Save" to save your changes.)

Our second action for this rule will be the configuration of the Experience Cloud ID Service and the ID-sync between the ECID and the email ID, by configuring the Action as follows:

| Extension                   | Action Type        | Name                                           |
|:---------------------------:| :-----------------:| :--------------------------------------------: |
| Experience Cloud ID Service | Set Customer ID's  | Experience Cloud ID Service - Set Customer IDs |

![Launch Setup](./images/ecidconfig.png)

The following variables need to be configured here:

| Integration Code       | Value             | Auth State        |
|:-----------------------| :---------------- | :---------------- |
| CustomerID             | %customerEmail%   | Authenticated     |

![Launch Setup](./images/idsync.png)

Click "Keep Changes" to save your Action.

Click "Save" to save your Rule Configuration.

With this, you've successfully finished the setup of your Rules in Launch.

Let's do some publishing now!

[Next Step: Exercise 1.2.6 - Publish Launch Property](./ex6.md)



_tcsamericasptrsd