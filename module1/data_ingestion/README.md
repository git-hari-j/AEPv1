## Exercise 1.3: Data Ingestion from Offline Sources
In this exercise, the goal is to onboard external data like CRM Data in Platform.

### Learning Objectives

- Learn how to generate your demo data
- Learn how to ingest CSV
- Learn how to use the web UI for data ingestion through Workflows
- Understand the data governance features of Experience Platform

### Lab Resources

- Mockaroo UI: [https://www.mockaroo.com/](https://www.mockaroo.com/)
- Experience Platform UI: [https://platform.adobe.com/](https://platform.adobe.com/)

### Lab Tasks

- Create a CSV file with demo date. Ingest the CSV file in the Experience Platform UI by making use of the available workflows.
- Understand data governance options in Experience Platform UI 

### Exercise 1.3.1 - Create your CRM Dataset through a data generator tool

Every Solution Consultant has already been faced with the questions: "How to generate enough demo data to make my demo realistic? And how to do that in a fast and easy way?".
There are free tools available online that help you answer those questions. For this enablement, we've decided to use [Mockaroo](https://www.mockaroo.com/12674210). Mockaroo lets you generate up to 1,000 rows of realistic test data in CSV, JSON, SQL, and Excel formats free of charge.

For this exercise you need 1000 lines of CRM Data. To make this as efficient as possible, a data generator template was prepared.

Open the Mockaroo Template by going to [https://www.mockaroo.com/12674210](https://www.mockaroo.com/12674210).

![Data Ingestion](./images/mockaroo.png)

On the template, you'll notice the following fields:

  * id
  * first_name
  * last_name
  * email
  * gender
  * birthDate
  * home_latitude
  * home_longitude
  * country_code
  * city
  * country

All these fields have been defined to produce data that is compatible with Platform. 

![Data Ingestion](./images/dd.png)

To generate your CSV-file, click the "Download Data"-button which will give you a CSV-file with 1000 lines of demo-data. 

Open your CSV-file in Microsoft Excel to visualize its contents.

![Data Ingestion](./images/excel.png)

With your CSV-file ready, you can proceed with mapping it against XDM.

### Exercise 1.3.1 - Verify the CRM Dataset in the Platform UI

Open the [Platform UI](https://platform.adobe.com) and go to "Datasets". 

![Data Ingestion](./images/dataset.png)

We're going to use a shared dataset based in this enablement. The shared dataset has been created already and is called "CRM Onboarding".

![Data Ingestion](./images/emeacrm.png)

Open the dataset "CRM Onboarding (API)".

![Data Ingestion](./images/emeacrmoverview.png)

On the overview screen, you can see 3 main pieces of information.

![Data Ingestion](./images/dashboard.png)

First of all, the Dataset Activity dashboard shows the total number of CRM records in the dataset and the ingested batches and their status

![Data Ingestion](./images/batchids.png)

Second, by scrolling down on the page you can check when batches of data were ingested, how many records were onboarded and also, whether or not the batch was successfully onboarded. The "Batch ID" is the identifier for a specific batch job, and the "Batch ID" is important as it can be used for troubleshooting why a specific batch was not successfully onboarded. More on that in Enablement Module 2.

![Data Ingestion](./images/datasetsettings.png)

Lastly, the Dataset Info tab shows important information like the Dataset ID (again, important from a troubleshooting perspective), the Dataset's Name and whether the dataset was enabled for Unified Profile and Streaming Ingestion. 

![Data Ingestion](./images/ds_ups_link.png)

Enabling a dataset for Unified Profile can be done by clicking the "switcher"-icon. 

![Data Ingestion](./images/ds_streaming.png)

Enabling a dataset for Streaming Ingestion can currently only be done through the API's. 

The most important setting here is the link between the dataset and the Schema. The Schema defines what data can be ingested and how that data should look like. 

In this case, we're using the "CRM Onboarding"-schema, which is mapped against the class of "Profile" and has implemented extensions, also called mixins. 

![Data Ingestion](./images/ds_schemalink.png)

By clicking on the name of the schema, you're taken to the Schema overview were you can see all the fields that have been activated for this schema.

![Data Ingestion](./images/schemads.png)

Every schema needs to have a custom, primary descriptor defined. In the case of our CRM dataset, the schema has defined that the field "email" should be the primary identifier. If you want to create a schema and link it to the Unified Profile, you need to define a custom Mixin that refers to your primary descriptor.

![Data Ingestion](./images/schema_descriptor.png)

In the above screenshot, you can see that our descriptor is located in ```_tcsamericasptrsd.identification.emailId```, which is set as the Primary Identifier, linked to the namespace of "email".

Every schema and as such, every dataset that should be used in the Unified Profile should have 1 Primary identifier. This Primary Identifier is the identifier user by the brand for a customer in that dataset. In the case of a CRM dataset it might be the email-address or the CRM ID, in the case of a Call Center dataset it might be the mobile number of a customer.

It is best practice to create a separate, specific schema for every dataset and to set the descriptor for every dataset specifically to match how the current solutions used by the brand operate.

### Exercise 1.3.2 - Using a workflow to map a CSV file to an XDM Schema

The goal of this exercise is to onboard CRM data in Platform. All the data that is ingested in Platform should be mapped against the specific XDM Schema. What you currently have is a CSV dataset with 1000 lines on the one side, and a dataset that is linked to a schema on the other side. To load that CSV file in that dataset, a mapping exercise needs to take place. To facilitate this mapping exercise, we have "Workflows" availabe in Platform.

![Data Ingestion](./images/workflows.png)

The workflow that we'll use here, is the workflow named "Map CSV to XDM Schema" in the Data Ingestion menu.

Click the "Map CSV to XDM Schema"-button.

![Data Ingestion](./images/mapcsvxdm.png)

Click "Launch" to start the process.

![Data Ingestion](./images/launchprocess.png)

Drag & Drop your CSV-file or click "Browse" and navigate on your computer to your desktop and select your CSV-file.

![Data Ingestion](./images/dragdrop.png)

After selecting your CSV-file it will upload immediately and you will see a preview of your file within seconds.

![Data Ingestion](./images/previewcsv.png)

Click "Next" to go to the next step. It can take a few seconds while the file is processed completely.

![Data Ingestion](./images/next.png)

On the next screen, you need to select a dataset to ingest your file in. You have the choice between selecting an already existing dataset or creating a new one. For this exercise, we'll reuse an existing one: please select the "CRM Onboarding"-dataset as indicated below.

![Data Ingestion](./images/datasetselection.png)

Click "Next" to go to the next step.

![Data Ingestion](./images/next.png)

It's now time to map our CSV Column Headers with an XDM-property in our "CRM Onboarding"-schema.
Platform has already done some guessing for us, by trying to link the Source Attributes with the Target Schema Fields.

![Data Ingestion](./images/mapschema.png)

First of all, we need to add the required mapping for the descriptor field. The descriptor field is a required field in this workflow and expects you to indicate what the main identifier is of the file you're uploading. 

Selecting the descriptor is actually the most important thing: you'll be defining the custom, brand-specific, primary identifier. Within Platform-context, we refer to this custom, brand-specific, primary identifier as the descriptor. The descriptor is a requirement for this data to be onboarded. Without the presence of the descriptor, the ingestion of this CSV-file will fail.
Our descriptor for the "CRM Onboarding"-dataset is the "email" as it's the unique identifier for our dataset.
In our case, based on the selection of the dataset and the schema that is linked to the dataset, the required Target Schema Field in XDM is _experienceplatform.identification.emailId. You need to map the "email"-field from your CSV file as the source attribute for this required Target Schema Field.

To do this, click the "Add required mapping"-button.

![Data Ingestion](./images/reqmapping.png)

In the Source Attribute field, open the dropdown-list and select the field "email".

![Data Ingestion](./images/emptysource.png)

The result should look like this:
![Data Ingestion](./images/filledsource.png)

For the Schema Mappings, Platform has tried to link fields together already. However, not all proposals of mapping are correct.

![Data Ingestion](./images/schemamap.png)

For the Source Attribute "email", the Target Schema Field should be "personalEmail.address". You can either enter "personalEmail.address" in the field, or you can click the icon to visually locate the correct property in the "CRM Onboarding"-schema.

![Data Ingestion](./images/schema_icon.png)

![Data Ingestion](./images/schema_viz.png)

The other mapping proposals are correct already.

You also need to add 2 fields: home\_latitude and home\_longitude haven't been preselected by the Mapping Workflow Tool.

To add a new Schema Mapping, click the "Add new Schema mapping"-button.
Clicking that button adds a new empty mapping field.

![Data Ingestion](./images/addnewmapfield.png)

![Data Ingestion](./images/newmapfield.png)

In the "Source Attribute"-column, select "home\_latitude".
For the Target Schema Field, click on this icon:
 
![Data Ingestion](./images/schema_icon.png)

And locate the property "homeAddress.\_schema.latitude" by making use of the visual mapping tool.

![Data Ingestion](./images/schema_lat.png)

Click "Select" to confirm your choice.

![Data Ingestion](./images/schema_lat_result.png)

Repeat the process for the Source Attribute "home\_longitude", linking it to the Target Schema Field of "homeAddress.\_schema.longitude" so that you have this as a result:
 
![Data Ingestion](./images/schema_long_result.png)

And this should be the obverall result of the mapping exercise:

![Data Ingestion](./images/overall.png)

Click "Next" to go to the next step.

![Data Ingestion](./images/next.png)

On the next screen you'll see an overview of what you've done and you can start the ingestion. 

Click the "Ingest"-button.

![Data Ingestion](./images/ingest.png)

Ingestion starts and will be running for a number of seconds/minutes (depending on file-size).

![Data Ingestion](./images/ingest_running.png)

After a couple of minutes, the file will be successfully processed.

![Data Ingestion](./images/success.png)

Click the "Finish"-button to finish the workflow.

![Data Ingestion](./images/finish.png)

After clicking "Finish", you're taken to your dataset.

![Data Ingestion](./images/ingestdataset.png)

On the dataset, you'll see a Batch ID that was ingested just now, with 1000 records ingested and a status of "Success".

![Data Ingestion](./images/batchsuccess.png)

Click on the "Preview Dataset"- button to get a quick view of a small sample of the dataset to ensure that the loaded data is correct.

![Data Ingestion](./images/preview.png)

![Data Ingestion](./images/previewdata.png)

Once data is loaded, we can define the correct data governance approach for our dataset.
   
### Exercise 1.3.4 - Adding data governance to your dataset 

![Data Ingestion](./images/ingestdataset.png)

Now that our customer data is ingested, we want to make sure that this dataset is properly governed for usage and export control. Click on the "Data Governance" tab and observe that we can set three types of restrictions: Contractual, Identity, and Sensitive Data.

You can find more info on the different labels and how they will be enforced in the future through the policy framework on this link: [https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html](https://www.adobe.io/apis/experienceplatform/home/dule/duleservices.html) 
 

![Data Ingestion](./images/dsgovernance.png)

Let's restrict identity data for the entire dataset. Hover over your dataset name, and click the Pencil icon to edit the settings. 

![Data Ingestion](./images/pencil.png)

Go to "Identity Data" and you'll see that the "I2" option is checked - this will assume that all pieces of information in this dataset are _at least_ indirectly identifiable to the person.

![Data Ingestion](./images/identity.png)

Click "Save Changes" and observe that "I2" is now set for all data fields in the dataset. 

You can also set these flags for individual data fields - for example, the "firstName" field is likely to be classified as an "I1" level for directly identifiable information.

Select the field "firstName" by checking the checkbox and click on "Edit Governance Labels" in the upper right corner of your screen.

![Data Ingestion](./images/editfirstname.png)

Go to "Identity Data" and you'll see that the "I2" option is already checked (inherited from the dataset). The field firstName also has a field-specific configuration and is set as "I1 - Directly Identifiable Data".

![Data Ingestion](./images/fndii.png)

With this, you've now successfully ingested and classified CRM Data in Adobe Experience Platform. 

[Go Back to Module 1](../README.md)

[Go Back to All Modules](/../../)



