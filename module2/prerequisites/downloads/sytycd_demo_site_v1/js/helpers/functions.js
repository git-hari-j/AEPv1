
function addPhoto() {

    var albumBucketName = config.s3["albumBucketName"];
    var bucketRegion = config.s3["bucketRegion"];
    var IdentityPoolId = config.s3["IdentityPoolId"];

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: albumBucketName }
    });

    var file = $("#takenPhoto").attr("src");
    var BASE64_MARKER = ';base64,';
    var u8Image = convertDataURIToBinary(BASE64_MARKER, file);
    var albumPhotosKey = encodeURIComponent("album3") + '/';

    var photoKey = albumPhotosKey + "_aep_"+Math.floor(Math.random()*1E16)+".png";
    s3.upload({
        Key: photoKey,
        Body: u8Image,
        ACL: 'public-read'
    }, function (err, data) {
        if (err) {
            return alert('There was an error uploading your photo: ', err.message);
        }

        // SET IMAGE
        console.log('Successfully uploaded photo.', data);
        $("#imgPictureUrl").attr("src", data.Location);
        $("#pictureurl").val(data.Location); //http://s7e4a.scene7.com/is/image/OmniPS/adobelogo?$generic%5Fimg%5Fpreset$

        //Adobe.getToken("now", function(token) {
        //  var tokenjson = JSON.parse(token);
        //  var theSelectedTags = [];
        setTimeout(function(){
            Runtime.msftFaceAttributes(data.Location, function(msftattributes) {
                console.log("MSFT Attributes:", msftattributes);
                var faceatt = $.parseJSON(msftattributes.body);

                //var attSmile = faceatt[0].faceAttributes.smile;
                var attGender = faceatt[0].faceAttributes.gender;
                var attAge = faceatt[0].faceAttributes.age;
                var attGlasses = faceatt[0].faceAttributes.glasses;
                var attEyeMakeup = faceatt[0].faceAttributes.makeup.eyeMakeup;
                var attLipMakeup = faceatt[0].faceAttributes.makeup.lipMakeup;
                var attEmotion = faceatt[0].faceAttributes.emotion.neutral;

                var emotion = faceatt[0].faceAttributes.emotion; //Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise
                var mainEmotion = "";
                var theEmotionValue = -1;

                $.each(emotion, function(key, value) {
                    if(value > theEmotionValue){
                        theEmotionValue = value;
                        mainEmotion = key;
                    }
                }
                );
                
                //$("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attSmile+'"><i class="far fa-smile"></i> '+attSmile+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attGender+'"><i class="fa fa-venus-mars"></i> '+attGender+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attAge+'"><i class="fa fa-child"></i> '+attAge+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attGlasses+'"><i class="fas fa-glasses"></i> '+attGlasses+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attEmotion+'"><i class="fas fa-meh"></i> '+mainEmotion+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attEyeMakeup+'"><i class="fas fa-meh"></i> '+attEyeMakeup+'</div>');
                $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+attLipMakeup+'"><i class="fas fa-meh"></i> '+attLipMakeup+'</div>');
                
                // STORE IMAGE
                var profileAttributes = attGender + ',' + attAge + ',' + attGlasses + ',' + mainEmotion + ',' + attEyeMakeup + ',' + attLipMakeup
                localStorage.setItem('profileImageAttributes', profileAttributes);
                localStorage.setItem('profileImage', data.Location);
                localStorage.setItem('profileEstimatedAge', attAge);
                localStorage.setItem('profileEstimatedGender', attGender);
                localStorage.setItem('profileEstimatedGlasses', attGlasses);
                localStorage.setItem('profileEstimatedEmotion', mainEmotion);
                localStorage.setItem('profileEstimatedEyeMakeup', attEyeMakeup);
                localStorage.setItem('profileEstimatedLipMakeup', attLipMakeup);
                localStorage.setItem('profilePictureTaken', "Y");
                


            
            })},2000);

            // Sensei.faceDetection("", function(smarttags) {
            //  var tags = JSON.parse(smarttags);

            //  console.log("[faceDetection] tags ", tags);
                
            //  // $.each(tags.cas_responses, function(i, item) {
            //  //  $.each(item.result.response.classification_entries, function(i, thetag) {
            //  //      var tagname = thetag.class.name;
            //  //      $("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+tagname+'">'+i+': '+tagname+'</div>');
            //  //  });
            //  // });

            //  $.each(tags.v3_attr, function(i, item) {
                    
            //      console.log("[faceDetection.v3_attr] item ", item);

            //  });

            //  $(".smarttag").click(function() {
            //      var selectedTag = $(this).attr("data-id-tagname");
            //      $(this).addClass('selecttag');
            //      theSelectedTags.push(selectedTag);

            //  });

            // });

        //});
        
    });
}