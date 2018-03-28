$(function(){
	$("#nav-select").on('change',function(event){
		var value = $("#nav-select").val();
		switch(value){
			case "home":
				window.location = "index.html";
				break;
			case "download":
				window.location = "docs/downloads.html";
				break;
			case "documentation":
				window.location = "docs/documentation.html";
				break;
			case "examples":
				window.location = "docs/examples.html";
				break;
			default:
				alert("An error has occured!");
		}
	});
});