Adobe = {

	getToken: function(path, callback) {

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://adobeioruntime.net/api/v1/web/salesvelocity/utils_prd/imsproxy?url=https://ims-na1.adobelogin.com/ims/exchange/jwt",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"cache-control": "no-cache"
			},
			"data": {
				"client_id": "77a86f4b146546eeb75c295bb1016cd1",
				"client_secret": "e08f5638-51f4-4847-b4e2-5559ce440c59",
				"jwt_token": "eyJhbGciOiJSUzI1NiJ9.ew0KICAgICJleHAiOiAxNTU5NzQ3Mjc1LA0KICAgICJpc3MiOiAiMUU2RDM3MDQ1MzIzNzM0RTBBNDkwRDQ0QEFkb2JlT3JnIiwNCiAgICAic3ViIjogIjZGQkQxNEZBNUNFNkY2RkQwQTQ5NUNDMUB0ZWNoYWNjdC5hZG9iZS5jb20iLA0KICAgICJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vcy9lbnRfc2Vuc2VpX2ltYWdlX3NkayI6IHRydWUsDQogICAgImF1ZCI6ICJodHRwczovL2ltcy1uYTEuYWRvYmVsb2dpbi5jb20vYy83N2E4NmY0YjE0NjU0NmVlYjc1YzI5NWJiMTAxNmNkMSINCn0.fk9ugBtxy7MEDLdVzoLx8SagpXSspT_O-tEXvjcuoGgalEj6o14uKkZOz4_yycfj44DXs-a2NsWf2MNZLvEDYXZPMCG3ogKqU0qD84zZc8MnF2awIvIu13j9wRZvbWXpnnEEcH3LBn0lAx4y6zyBlgxSp7Y_YUhEmDsVH1y8E2J7CHlZ3DOR6-8PbMwOZWnWm5g5Bpcua9EEnjWmOz9lxPAy0bHW0t4mgQTdjGT5z0jOONsi2-8BR5lLR6O7B0mmBVcjuHPQ4I23jyGgfcayE_0YRXLKJ61bNDM9dUkTinlDMoTP3ULzOXXQlIQJ-vBg2Ux8zvRL9sQnPqbWtb-VBA"
			}
		}
		  
		$.ajax(settings).done(function (response) {
			console.log("[Adobe.getToken]: ",JSON.parse(response));
			callback(response);

		});

	},

	uploadPhoto: function(path, callback) {



	}

}

MSFT = {

	faceAttributes: function(token, callback) {

		var form = new FormData();
		form.append("url", "https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/am-with-glasses.png");

		//var sourceImageUrl = "https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/am-with-glasses.png";
		var sourceImageUrl = "https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/am-with-without-glasses.png";

		var subscriptionKey = "d0f61cde31ad41e9ac367c0c16c9bdbb";

		var uriBase = "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect";

		var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,gender,headPose,smile,facialHair,glasses,emotion," +
                "hair,makeup,occlusion,accessories,blur,exposure,noise"
		};

		$.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        }).done(function (response) {
			//console.log("[Sensei.sendAutoTag]: ",JSON.parse(response));
			$('#pictureurl').attr('value', sourceImageUrl)
			$("#imgPictureUrl").attr("src", sourceImageUrl);

			callback(response);
		});
		
	}

}

Runtime = {

	msftFaceAttributes: function(imagePath, callback) {

		var payload = {
			"payload": {
				"subscriptionKey": config.runtime["subscriptionKey"],
				"sourceImageUrl": imagePath, //"https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/am-with-without-glasses.png",
				"uriBase": config.runtime["uriBase"]
			}
		}

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": config.runtime["url"],
			"method": "POST",
			"headers": {
			  "Content-Type": "application/json",
			  "cache-control": "no-cache"
			},
			"processData": false,
			"data": JSON.stringify(payload)
		}

		$.ajax(settings).done(function (response) {
			//console.log("[Runtime.msftFaceAttributes]: ",JSON.parse(response));
			callback(response);
		});

	}

}

Sensei = {

	sendAutoTag: function(token, callback) {

		var form = new FormData();
		form.append("fileURL", "https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/647_071717062112.jpg");
		form.append("contentAnalyzerRequests", "{\"requests\":[{\"analyzer_id\":\"classifier:tagging:1\",\"parameters\":{\"model\":\"stock3\"}}]}");

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://sensei.adobe.io/analyzers",
			"method": "POST",
			"headers": {
				"cache-control": "no-cache,no-cache",
				"x-api-key": "77a86f4b146546eeb75c295bb1016cd1",
				"Authorization": "Bearer "+token
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		}

		$.ajax(settings).done(function (response) {
			//console.log("[Sensei.sendAutoTag]: ",JSON.parse(response));
			callback(response);
		});
	},

	faceDetection: function(token, callback) {

		var form = new FormData();
		form.append("url", "https://acsms02-publish.adobedemo.com/content/dam/microsoft-chatbot/am-with-glasses.png");

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://svmobilefd.adobedemo.com/summit",
			"method": "POST",
			"headers": {
				"Authorization": "Basic c3Ztb2JpbGU6ajg5UkU2dFVRNHJFeVZIQw=="
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		}

		$.ajax(settings).done(function (response) {
			console.log("[Sensei.faceDetection]: ",JSON.parse(response));
			callback(response);
		});

	}


}