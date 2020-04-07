## Exercise 5.4 - Scoring and Consumption of Insights

Now that we’ve experimented with our recommendations model and have determined the optimal run, we can move on to scoring the model to generate product recommendations insights for customers of La Boutique.

The URL to login to Adobe Experience Platform is: [https://platform.adobe.com](https://platform.adobe.com)

### Exercise 5.4.1 - Score a Model based on a Recipe

After training a model, we can use the model to score and as such, have the model build recommendations which can be activated through targeting.

To start scoring, let's re-open Training Run 1 by clicking it.

![DSW](./images/trainingrunsuccess.png)

After opening Training Run 1, you'll see a full overview of the Training Run, and in the future, more visualization options will be added.

![DSW](./images/trr1.png)

To score, you have to click the ```+ Score``` - button in the top right corner of your screen.

![DSW](./images/score.png)

In the next step, you again have to select an Input Dataset. Let's choose the ```Recommendations Input Dataset```. 

![DSW](./images/scoreinput.png)

After selecting the Input Dataset, click ```Next```.

![DSW](./images/next.png)

In the next step, you need to select a dataset to which Platform will output results. In this case, select the ```Recommendations Output Dataset```.

![DSW](./images/scoreoutput.png)

After selecting the Output Dataset, click ```Next```.

![DSW](./images/next.png)

In the next screen, you can again specify/change some of the Model's Configuration parameters.

![DSW](./images/scoreconfig.png)

After updating the Model's Configuration parametres, click ```Finish```.

![DSW](./images/finish.png)

A ```Scoring Run``` is now created, and has a status of ```Pending```.

And 1-2 minutes later, the Scoring Run's status will change to ```Complete```.

![DSW](./images/scoringrunsuccess.png)

And finally, let's preview the results. Click on ```Scoring Run 1```

![DSW](./images/scoringrunsuccessdtl.png)

Next, click the ```Preview Scoring Results Dataset```.

![DSW](./images/preview.png)

![DSW](./images/previewresults.png)

With this, you've successfully finished this exercise and this module.

---

[Go Back to Module 5](./README.md)

[Go Back to All Modules](../README.md)