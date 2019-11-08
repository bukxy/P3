$(document).ready(function () {
	let slider = Object.create(imageSlider);
	slider.initialisation("#slider");

	var map = Object.create(MapGoogleJcdecaux);
	map.initialisation();
	
	var canvas = Object.create(myCanvas);
	canvas.initialisation();
 
	var reservation = Object.create(booking);
	reservation.initialisation();
	
	// Exécute un appel AJAX GET
	// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
	function ajaxGet(url, callback) {
		var req = new XMLHttpRequest();
		req.open("GET", url);
		req.addEventListener("load", function () {
			if (req.status >= 200 && req.status < 400) {
				// Appelle la fonction callback en lui passant la réponse de la requête
				callback(req.responseText);
			} else {
				console.error(req.status + " " + req.statusText + " " + url);
			}
		});
		req.addEventListener("error", function () {
			console.error("Erreur réseau avec l'URL " + url);
		});
		req.send(null);
	}
});
