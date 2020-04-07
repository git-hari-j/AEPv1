# Module 4: Adobe Experience Platform Query Service


**In Module 4**, you will get a hands-on preview of Adobe Experience Platform Query Service. Query Service lets you perform omnichannel queries across all Adobe Experience Cloud product data, joining and analyzing data across Adobe Campaign, Analytics, Audience Manager, Target, and Advertising Cloud and other customer data loaded/inserted into Adobe Experience Platform. 

Query Service is a serverless tool. It supports SQL queries and connectivity from multiple client applications through its PostgreSQL compatibility. 
We will use data that has been injected into platform using either Web Interaction Data, Call Center Interactions in combibation with Customer Loyalty Data uploaded into platform.

## Key Takeaways

* Become familiar with the Adobe Experience Platform UI
* Connect to Query Service and run your SQL queries
* Explore datasets in Adobe Experience Platform
* Connect Tableau or Power BI to the Adobe Experience Platform Query Service to create visualizations and reports

## Prerequisites

* Some familiarity with SQL is preferred, but not required
* Access to Adobe Experience Platform 
* Datasets (dataset used during lab, pre-loaded for you)
* Installation and configuration of PostgreSQL compliant client or command line interface 
* Tableau or Microsoft Power BI Desktop

## Lab Content

### [Exercise 0 - Pre-requisites](exercises/0-prereq.md)

You will need to install psql to execute the queries in this enablement excercise. Depending on your operating system you will have to install Microsoft Power BI or Tableau. Windows users can choose between Power BI or Tableau. Mac users should install Tableau.

### [Exercise 1 - Getting Started](exercises/1-getting-started.md)

In this exercise you will explore the Adobe Experience Platform Query Service User Interface, learn about data sets, find your queries and finaly setup a connection from PSQL.

### [Exercise 2 - Using the Query Service](exercises/2-using-query-service.md)

In this exercise you will learn about the basic Query Service syntax and you can identify the attributes of the XDM schema in your query.

### [Exercise 3 - Queries, queries, queries...  and churn analysis](exercises/3-queries.md)

In this exercise you will be doing queries, you will learn about the Adobe Defined Functions while doing some churn analysis. At the end of this exercise you will write a query to prepare a dataset for use in Microsoft Power BI.

### [Exercise 4 - Power BI/Tableau](exercises/4-power-bi.md)

In this exercise you will generate a dataset from a query executed in the previous exercise and you will use this dataset in Power BI or Tableau to to Callcenter Interaction Analysis.


[Go Back to All Modules](../README.md)
