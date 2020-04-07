## Exercise 1.2: Launch & Platform Data Ingestion Configuration
In this exercise, the goal is to install and configure Launch and Platform to capture data from our La boutique demo website.

### Learning Objectives

- Learn how to integrate Adobe Experience Platform Launch onto a webpage
- Create Launch rules to stream data to Experience Platform using the new Adobe Experience Platform extension

### Lab Resources

- Launch URL: [https://launch.adobe.com](https://launch.adobe.com)
- Report Suite: aepmeaplatformdemo
- Tracking Server: tcsamericasptrsd.sc.omtrdc.net
- AAM Partner Name: tcsamericasptrsd

### Lab Tasks

- Deploy webpage on local server
- Create Launch property and add streaming endpoint to webpage
- Create data elements and rules to stream a data beacon into Experience Platform
- Observe the beacon firing, and landing in Experience Platform


### Story

After setting up our website, we now want to make sure that new Profile data (from sign-ups) and behavioral ExperienceEvent data (browsing habits, actionable triggers, etc) are recorded and updated in near real-time. We can do this by utilizing Adobe Experience Platform Launch on our website. For this exercise, we will step into the shoes of the owners of La Boutique, a fashion retail website, and see how we can bring in behavioral and profile data from website interactions into Experience Platform.

### [Exercise 1.2.1 - Create a Launch Property](./ex1.md)
In this exercise, you'll set up a Launch property which will be used on your La Boutique demo website.

### [Exercise 1.2.2 - Configure Launch Extensions](./ex2.md)
In this exercise, you'll be configuring the required Launch extensions for your property.

### [Exercise 1.2.3 - Configure Launch Data Elements](./ex3.md)
In this exercise, you'll be configuring Data Elements so you can send data to Platform.

### [Exercise 1.2.4 - Retrieve Data Sets in Platform](./ex4.md)
In this exercise, you'll set up and configure data sets in Adobe Experience Platform.

### [Exercise 1.2.5 - Configure Launch Rules](./ex5.md)
After the configuration of your Launch property with extensions and data elements, and the configuration of your datasets in the Platform UI, you're now ready to configure your Launch rules to send real data into Platform.

### [Exercise 1.2.6 - Publish your Launch Property](./ex6.md)
With all Launch configuration done now, let's publish your Launch property.

### [Exercise 1.2.7 - Implement Launch Tag on La Boutique website](./ex7.md)
After publishing your Launch property, you can now implement it on your La Boutique website.

### [Exercise 1.2.8 - Verify Data Ingestion from website into Platform](./ex8.md)
With the implementation done now, you'll learn how you can verify your full implementation.

[Next Step: Data Ingestion](../data_ingestion/README.md)

[Go Back to Module 1](../README.md)

[Go Back to All Modules](/../../)
