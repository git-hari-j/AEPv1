# Exercise 3.1 Set up an Alexa Developer Account

## Introduction

This module's objective is to demonstrate how to use an internet of things device (like an Alexa device) with the Adobe Experience Platform. For that purpose, this module guides through the steps to create an Amazon Alexa skill and use it as part of your demo. The ultimate result will be that relevant voice interactions with an Alexa device simulator or real Alexa device will be sent to Adobe Experience Platform and become part of the overall experience event data in the platform.

In order to demonstrate how to use such an Alexa skill, you will have to setup your skill within an Amazon developer account. With an Amazon developer account you can build your skill and, even more important, simulate your skill, which is especially relevant in case you do not own an Alexa device like an Echo Spot or Echo Show. If you do have an Alexa device with a display, it is even more fun...!

You also have to sign up for an AWS account, as the skill we will use requires server-less functions deployed in a AWS Lambda environment.

## Exercise 3.1.1: Set up Amazon developer account

**Important**
Due to Adobe's internal security restrictions, you can **NOT** use your Adobe email address for an Amazon developer account. Please use a non-Adobe email address for signing up to an Amazon developer account.

To set up an Amazon developer account:

1. Go to [https://developer.amazon.com](https://developer.amazon.com).
![Amazon Sign In](./images/amazonsignin.png)
2. Click on **Sign In** at the top right. If you already do have an Amazon developer account, skip to step 9.
3. Click **Create your Amazon Developer account** to create a new Amazon developer account.
![Create Developer Account](./images/createdeveloperaccount.png)
4. In the **Create Account** screen, provide your **Name**, **Email** and choose a **Password**. Then click **Create your Amazon Developer Account**.
![Create Account](./images/alexadeveloperaccountdetails.png) Some additional verification might be required.
5. You will receive a verification code on the provided email address. Use that on the **Verify email address** screen and click on **Verify**.
![Verify email address](images/verifyemailaddress.png)
6. Provide all required details on the **Profile** tab the **Registration** screen, then click on **Save and Continue**.
![Registration Details](images/registrationdetails.png)
7. Read all details (*really...?)* on the **Amazon Delivery Services Agreement** tab and then click **Accept and Continue**.
![Service Agreement](images/serviceagreement.png)
8. You will get a dialog asking whether you want to provide payment details. You can (obviously) skip that by closing the dialog. Click on the X at the right top of the dialog.
![Payment Details](images/paymentdetails.png)
9. You will see the **Amazon Developer Dashboard** main window.
![Alexa Developer Dashboard](./images/alexadeveloperdashboard.png)

## Exercise 3.1.2: Setup an Amazon Web Services account

**Important**
Due to Adobe's internal security restrictions, you can **NOT** use your Adobe email address for an AWS account. Please use a non-Adobe email address for signing up to an AWS account. Preferably, use the same email address for your AWS account as you have used for your Alexa developer account.

To set up an Amazon Web Services account:

1. In a new browser window or tab, go to [https://aws.amazon.com/lambda/](https://aws.amazon.com/lambda/). If you already do have an account, skip to step 10.
![AWS main screen](images/awsmainscreen.png)
2. Click on **Sign Up** or **Sign In to the Console** or **Create an AWS Account** orange button on the top right. It's a bit unpredictable what Amazon shows there...
3. In the **Create an AWS account** screen, define **Email address**, **Password** and an **AWS account name**. Then click on **Continue**.
![Create AWS Account](images/createawsaccount.png)
4. In the **Contact Information** screen:
   1. Select **Personal** for the **Account Type**.
   2. Provide required details in the **Contact Information** screen, and click on **Create Account and Continue**.
   ![Contact Information](images/awscontactinformation.png)
5. Provide your credit card details in the **Payment Information** screen and click on **Secure Submit**.
![Payment Information](images/awspaymentinformation.png)
Note that you will not be charged unless you exceed the AWS Free Tier Limits, which is extremely unlikely using your Alexa skill for demonstration purposes. However you have to provide payment details to continue.
6. Provide details on how to confirm your identity, by selecting **Text Message (SMS)** in the **Confirm your identity** screen, and click on **Send SMS**.
![Confirm Your Identity](images/confirmyouridentity.png)
7. Use the verification code you will receive as an SMS in the **Enter verification code** dialog and click **Verify Code**.
![AWS Verification Code](images/awsverificationcode.png)
You will get a confirmation saying **Your identity has been verified successfully.**.
![AWS Verified Successfully](images/awsverifiedsuccessfully.png)
Click on **Continue**.
8. In the **Select a Support Plan**, select **Basic Plan** as the plan by clicking on the **Free** button.
![AWS Support Plan](images/awssupportplan.png)
9. You can provide more details in the **Welcome to Amazon Web Services** screen but that is not required.
![AWS Welcome Screen](images/awswelcomescreen.png)
Click on **Sign In to the Console**.
10. In the **Sign in** screen, provide your AWS email address to login.
![AWS Sign In](images/awssigninemail.png)
Click on **Next**
11. In the **Root user sign in** screen, provide your **Password** and click on **Sign in**.
![AWS Sign In Password](images/awssigninpassword.png)
12. You will end up in the **AWS Management Console**.
![AWS Management Console](images/awsmanagementconsole.png)
13. Leave the browser tab open; we will need it later in the module.

You have finished this exercise. Go to [next exercise](../define/README.md) to continue this module.

[Go Back to All Modules](../README.md)
