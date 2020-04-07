### Exercise 2.4.2 - Create a segment through the Platform API

Go to Postman.

Locate the collection: _TCS Platform Enablement - JWT Start. In this collection, you'll see a folder "2. Segmentation". We'll be using these calls in this exercise.

![Segmentation](./images/pmdtl.png)

What we'll do next is follow all the required steps to create a segment through the API. We're going to build a simple segment: "ldap - All Female Customers".

#### Step 1 - Create a Segment Definition

Click on the call named "Profile: Create A Segment Definition"

![Segmentation](./images/s1_call.png)

Go the the "Body" section of this call.

![Segmentation](./images/s1_body.png)

In the Body of this call, you'll see the following:

![Segmentation](./images/s1_bodydtl.png)

The language used for this call is called "PQL": Profile Query Language.
You can find more info and documentation about PQL [here](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_pql.md). 

Attention: please update the variables **"name"** and **"parameter"** in the below call by replacing **"ldap"** with your specific **ldap**

```
{
    "name" : "ldap - All Female Customers (API)",
    "expression" : {"type":"PQL", "format":"pql/json", "value":"{\"nodeType\":\"fnApply\",\"fnName\":\"in\",\"params\":[{\"nodeType\":\"fieldLookup\",\"fieldName\":\"gender\",\"object\":{\"nodeType\":\"fieldLookup\",\"fieldName\":\"person\",\"object\":{\"nodeType\":\"literal\",\"literalType\":\"XDMObject\",\"value\":\"profile\"}}},{\"literalType\":\"List\",\"nodeType\":\"literal\",\"value\":[\"female\"]}]}"},
    "createdBy": "ldap",
    "schema" : { "name" : "_xdm.context.profile"},
    "ttlInDays" : 90
}
```
After adding your specific **ldap**, the Body should look similar to this:

```
{
    "name" : "vangeluw - All Female Customer (API)",
    "expression" : {"type":"PQL", "format":"pql/json", "value":"{\"nodeType\":\"fnApply\",\"fnName\":\"in\",\"params\":[{\"nodeType\":\"fieldLookup\",\"fieldName\":\"gender\",\"object\":{\"nodeType\":\"fieldLookup\",\"fieldName\":\"person\",\"object\":{\"nodeType\":\"literal\",\"literalType\":\"XDMObject\",\"value\":\"profile\"}}},{\"literalType\":\"List\",\"nodeType\":\"literal\",\"value\":[\"female\"]}]}"},
    "createdBy": "vangeluw",
    "schema" : { "name" : "_xdm.context.profile"},
    "ttlInDays" : 90
}
```

Now, click the blue "Send"-button to create the segment and view the results of that.

![Segmentation](./images/s1_bodydtl_results.png)

After this step, you can view your Segment Defintion in the Platform UI. To check this, log in to Platform and go to [https://platform.adobe.com/profile/segmentation](https://platform.adobe.com/profile/segmentation). 

![Segmentation](./images/s1_segmentdef.png)

If you edit the Segment Definition for **ldap** - API - All Females, you'll see the UI-version of your segment query. 

#### Step 2 - Create a Segment POST Job

So far, whether done through the UI or the API, you've only built Segment Definitions. Creating a segment definition doesn't mean that the segment has actually run. At this moment, nobody qualifies for this segment. To make people qualify, the segment needs to run.

Currently, the UI doesn't allow really 'running' the segment yet, however it is already possible through the API.

Let's now POST a Segment Job.

Go to Postman.

![Segmentation](./images/pmdtl.png)

In your Postman-collection, click on the call named "POST Segment Job"

![Segmentation](./images/s2_call.png)

Click on the blue "Send"-button.

You should see a similar result:

![Segmentation](./images/s2_call_response.png)

This Segment Job is now running, and this may take some time. In Step 3, you'll be able to check the status of this job.


#### Step 3 - GET Segment Job status

Go to Postman.

![Segmentation](./images/pmdtl.png)

In your Postman-collection, click on the call named "GET Segment Job status"

![Segmentation](./images/s3_call.png)

Click on the blue "Send"-button.

You should see a similar result:

![Segmentation](./images/s3_status.png)

In this example, the "status" of the job is set to "QUEUED".

Repeat this call by clicking the blue "Send"-button every couple of minutes untill the "status" is set to "SUCCEEDED".

![Segmentation](./images/s3_status_succeeded.png)

Once the status is "SUCCEEDED", you can continue to Step 4. Please wait to proceed until the status is "SUCCEEDED", otherwise the following exercises won't work.

#### Step 4 - Create a dataset to hold the results of your Segment Job

Once the segment has run, we're able to process the output of the segment job and save it in a dataset. By saving our output into a dataset, it becomes part of an exportable list that in this case, contains all female customers.

Go to Postman.

![Segmentation](./images/pmdtl.png)

In your Postman-collection, click on the call named "Catalog: Create Segment Dataset"

![Segmentation](./images/s4_call.png)

In the Body of this call, you'll see the following:

![Segmentation](./images/s4_bodydtl.png)

Attention: please update the variable **"name"** in the below call by replacing **"ldap"** with your specific **ldap**

```
{
    "name": "ldap - ProfileSegmentDataset - All Females",
    "description" : "ldap - ProfileSegmentDataset - All Females",
    "schemaRef": {
        "id": "https://ns.adobe.com/--sandboxname---/schemas/dc52c40811fe19126c25557ee9c90462",
        "contentType": "application/vnd.adobe.xed-full+json;version=1"
   },
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
   "streamingIngestionEnabled": "false",
    "tags":
    {
           "unifiedIdentity": ["enabled:true"],
           "unifiedProfile": ["enabled:true"]
    }
}
```

After adding your specific **ldap**, the Body should look similar to this:

```
{
    "name": "vangeluw - ProfileSegmentDataset - All Females",
    "description" : "vangeluw - ProfileSegmentDataset - All Females",
    "schemaRef": {
        "id": "https://ns.adobe.com/--sandboxname--/schemas/dc52c40811fe19126c25557ee9c90462",
        "contentType": "application/vnd.adobe.xed-full+json;version=1"
   },
    "fileDescription": {
        "persisted": true,
        "containerFormat": "parquet",
        "format": "parquet"
    },
   "streamingIngestionEnabled": "false",
    "tags":
    {
           "unifiedIdentity": ["enabled:true"],
           "unifiedProfile": ["enabled:true"]
    }
}
```

Now, click the blue "Send"-button to create the segment and view the results of that.

![Segmentation](./images/s4_results.png)

You've now successfully created a dataset in Platform through the API.

You can now view your dataset in the Platform UI. To check this, log in to Platform and go to [https://platform.adobe.com/profile/datasets](https://platform.adobe.com/profile/datasets). 

![Segmentation](./images/s4_ui_ds.png)

The dataset you created doesn't have data yet, you'll do that in Step 5.

#### Step 5 - Create an Export Job

We now have a successful Segment Job and a dataset in Platform to store the result of the Segment Job. In this step, you need to Start a Job to Export that information.

Go to Postman.

![Segmentation](./images/pmdtl.png)

In your Postman-collection, click on the call named "POST Export Job"

![Segmentation](./images/s5_call.png)

Click on the blue "Send"-button.

You should see a similar result:

![Segmentation](./images/s5_result.png)

The Export Job to the dataset is now running. Go to Step 6 to check up on the status of this job.

#### Step 6 - Verify Job Status

Go to Postman.

![Segmentation](./images/pmdtl.png)

In your Postman-collection, click on the call named "Get Export Job By Id"

![Segmentation](./images/s6_call.png)

Click on the blue "Send"-button.

You should see a similar result:

![Segmentation](./images/s6_status.png)

In this example, the "status" of the job is set to "PROCESSING".

Repeat this call by clicking the blue "Send"-button every couple of minutes untill the "status" is set to "SUCCEEDED".

![Segmentation](./images/s6_status_succeeded.png)

Once the status is "SUCCEEDED", you can now view your Segment Definition's data in the Platform UI. To check this, log in to Platform and go to [https://platform.adobe.com/datasets](https://platform.adobe.com/datasets). 

Click on your dataset "ldap - ProfileSegmentDataset". You should see a batch that is currently processing.

![Segmentation](./images/s6_ds_processing.png)

After a couple of minutes, the status of the batch will become "Success".

![Segmentation](./images/s6_ds_succes.png)

You can also visually check to see that all of the people in this segment have a gender of "female" by previewing the dataset.

Congrats, you've successfully completed the Segmentation exercise.

[Next Step: Walkthrough of Demo Scenario](../demo)

[Go Back to Module 2](../README.md)

[Go Back to All Modules](/../../)



