
# Exercise 4.4.2 Explore the dataset with Tableau

Start Tableau

![start-tableau.png](../resources/start-tableau.png)

In "Connect To a Server" select "PostgreSQL":

![tableau-connect-postgress.png](../resources/tableau-connect-postgress.png)

In the connection dialog, specify **wundermanworldwidepartner.platform-query.adobe.io** as the "Server" and **80** as the "Port", you can find your user name and password to connect to Adobe Experience Platform Query Service in the Platform UI, "Credentials" section of the Queries menu.

![query-service-credentials.png](../resources/query-service-credentials.png)

Sign In:

![tableau-connection-dialog.png](../resources/tableau-connection-dialog.png)

Click search (1) and enter your **ldap** into the search field, identify you table from the result set and drag (3) it onto the location named "Drag tables here". When finished, click on "Sheet 1" (3).

![tableau-drag-table.png](../resources/tableau-drag-table.png)

To visualize our data on the map we need to convert longitude and latitude to dimensions. In "measures" select "Latitude" (1) and open the field's dropdown and select "Convert to Dimension" (2). Do the same for the "Longitude" measure.

![tableau-convert-dimension.png](../resources/tableau-convert-dimension.png)

Drag the "Longitude" measure to the "Columns" and the "Latitude" measure to "Rows". Automatically the map of "Belgium" will appear with little dots representing the cities in out data set.

![tableau-drag-lon-lat.png](../resources/tableau-drag-lon-lat.png)

Select "Measure Names" (1), open the dropdown and select "Add to Sheet" (2):

![tableau-select-measure-names.png](../resources/tableau-select-measure-names.png)

You will now have a map, with dots of various sizes. The size indicates the number of call center interactions for that specific city. To vary the size of the dots, navigate to the right panel and open "Measure Values" (using the drop down icon). From the drop down list select "Edit Sizes". Play around with different sizes.

![tableau-vary-size-dots.png](../resources/tableau-vary-size-dots.png)

To further display the data per "Call Topic), drag (1) the "Call Topic" dimension onto "Pages". Navigate through the different "call topics" using the "Call Topic" (2) on the right side of the screen:

![tableau-call-topic-navigation.png](../resources/tableau-call-topic-navigation.png)

Congratulations! You have finished the Adobe Experience Platform Query Service Module.

[Go Back to Module 4](../README.md)

[Go Back to All Modules](../../README.md)
