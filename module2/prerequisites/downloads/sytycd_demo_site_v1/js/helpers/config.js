var config = {};

config.s3 = {};
config.runtime = {};

config.s3["albumBucketName"] = "adobe.sv.aep.enablement";
config.s3["bucketRegion"] = "eu-west-1";
config.s3["IdentityPoolId"] = "eu-west-1:c82ebae4-d644-434c-b660-df2ed3be9be1";

config.runtime["subscriptionKey"] = "5719af59924b4ac69eedf34e8054e8fd";
config.runtime["uriBase"] = "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect"
config.runtime["url"] = "https://adobeioruntime.net/api/v1/web/malkin/microsoft/faceattributes"