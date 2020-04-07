
$(window).load(function() {

    //CAMERA Access
	var video = document.getElementById('video');

	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			video.play();
		});
	}

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
	
	if(localStorage.getItem('profileImage') !== null && localStorage.getItem('profileImage') !== ""){
		console.log("HHHHHH")
		$("#imgPictureUrl").attr("src", localStorage.getItem('profileImage'));
		$("#pictureurl").val(localStorage.getItem('profileImage'));
	}
	if(localStorage.getItem('profileImageAttributes') !== null){
		var tagArr = localStorage.getItem('profileImageAttributes').split(',');
		for(var i = 0; i<tagArr.length; i++){
			$("#thesmarttags").append('<div class="smarttag" data-id-tagname="'+tagArr[i]+'"><i class="far fa-smile"></i> '+tagArr[i]+'</div>');
		}
	}
    
	document.getElementById("snap").addEventListener("click", function() {
		context.drawImage(video, 0, 0, 440, 280);
		var photoImage = canvas.toDataURL("image/png");
        $("#takenPhoto").attr("src",photoImage);
        
        $("#snap").html('Take again?');

	});

	$('#storePhoto').click(function(){
		console.log("[storePhoto]");

        $("#thesmarttags").empty();

		addPhoto();

	});

	$('#openChat').click(function(){
		console.log("[openChat]");
		document.getElementById("chatForm").style.display = "block";
	});

	$('#closeChat').click(function(){
		console.log("[closeChat]");
		document.getElementById("chatForm").style.display = "none";
	});

});

function getMainAttribute(attribute) {
	console.log("[getMainAttribute] attEmotion ", attribute);
	var max;

	$.each(attribute, function(i, emotion) {
		if (!max || parseInt(emotion) > parseInt(max[index])) {
			max = arr[i];
		}
	});
	


    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function openChat() {
	document.getElementById("chatForm").style.display = "block";
}
  
function closeChat() {
	document.getElementById("chatForm").style.display = "none";
}

function convertDataURIToBinary(BASE64_MARKER, dataURI) {
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}