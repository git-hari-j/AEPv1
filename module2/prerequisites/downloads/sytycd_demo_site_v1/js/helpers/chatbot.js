$(window).load(function() {

	setTimeout(function(){
		$('#openChat').show();
	}, 5000);

	$('#openChat').click(function(){
		console.log("[openChat]");
		$(this).hide();
		openChat();
	});

	$('#closeChat').click(function(){
		console.log("[closeChat]");
		closeChat();
		$('#openChat').show();
	});
});

function openChat() {
	document.getElementById("chatForm").style.display = "block";
}

function closeChat() {
	document.getElementById("chatForm").style.display = "none";
}
