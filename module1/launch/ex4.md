## Exercise 1.2.4 - Retrieve Datasets in Platform

As part of the Launch Rule configuration, we'll define rules that will send behavioral and profile data to Platform. In Exercise 1.2.2 we've already defined a streaming endpoint so that we could send data directly from any source into Platform. When defining a rule to send in behavioral and/or profile data, we'll have to specify where that data needs to be stored in Platform. For that, we need to use datasets in Platform.

To log in to Platform, go to [https://platform.adobe.com/home](https://platform.adobe.com/home). 

Log in with your personal Adobe Login credentials.

![Platform Setup](./images/platformlp.png)

After login, make sure that you're in the right company: TCS Americas Partner Sandbox, which you can check in the top right corner of your screen.

![Platform Setup](./images/platformcompany.png)

A dataset needs to be mapped against a schema. Schema's are defined as part of our Experience Data Model, aka XDM.

Behavioral data needs to be mapped against the ExperienceEvent schema.

Profile data needs to be mapped against the Profile XDM schema.

You can consult these schema's by going to "Schemas" in the Platform menu.

If you'd like to know more about XDM, please have a look here:

  * [https://www.adobe.io/open/standards/xdm.html](https://www.adobe.io/open/standards/xdm.html)
  * [https://github.com/adobe/xdm
](https://github.com/adobe/xdm)

Search for "Website Registration Schema" to find the Profile XDM for our Platform Org.

![Platform Setup](./images/xdmprofile.png)

The Website Registration Schema looks like this:

![Platform Setup](./images/profiledtl.png)

Search for "Website Interaction Schema" to find the ExperienceEvent XDM.

![Platform Setup](./images/xdmprofile.png)

The Website Interaction Schema looks like this:

![Platform Setup](./images/eedtl.png)

Try to locate these 2 Schema's yourself in the UI of Platform.

For the Platform Enablement, we will be using shared datasets. These datasets have already been created. 

To view **Datasets**, navigate to the "Datasets" menu option.

You'll find a number of existing Datasets in Platform.

![Platform Setup](./images/datasets.png)

At this moment, we'll use 2 datasets, which are linked to the Schema's that you just viewed

  * 1 Dataset to capture Website Interaction data
  * 1 Dataset to capture Website Registration data

These datasets already exist! Don't recreate them.

  * Website Interaction Dataset name: 
  
    * **Website Interactions (API)**
      ![Platform Setup](./images/ee.png)

  * Website Registration name: 
  
    * **Website Registration Information (API)**
      ![Platform Setup](./images/p.png)

Congratulations for reaching this point! Let's continue with the Launch Rule Configuration now.

[Next Step: Exercise 1.2.5 - Configure Launch Rules](./ex5.md)



