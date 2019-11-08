var MapGoogleJcdecaux = {

    tableauMarker: [],

    initialisation: function () {

        this.map = new google.maps.Map(document.getElementById('carte'), {
            center: {
                lat: 45.759,
                lng: 4.841
            },
            zoom: 14
        });

        this.ajaxCall(this);

    },

    ajaxCall: function (context) {
        $.ajax({
            type: "GET",
            url: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=ec6fee2f7f64abccf76b52fb58f9b38284f9ef16",
            dataType: "json",

            success: function (reponse) {

                reponse.forEach(function (station) {

                    var marker = new google.maps.Marker({
                        position: {
                            lat: station.position.lat,
                            lng: station.position.lng
                        },
                        map: context.map
                    });
                    context.tableauMarker.push(marker);

                    ////////////////////////////////////////////////////////////////////////////////	STATION INFOS

                    marker.addListener("click", function () {
                        
                        if ((station.status === "OPEN") && (station.available_bike_stands >= 1) && (station.available_bikes >= 1) && ($('#cancelBooking').css('display') === 'none')) {
                            $('#canvasDiv').css('display', 'block');
                        } else {
                            $('#canvasDiv').css('display', 'none');
                        }

                        $("#infos h2").css("display", "block");
                        $("#divPreinfo").css('height', '0px');

                        $('#blockMenu').css('display', 'none');
                        
                        if($(window).width() <= 600){
                            $("#infos").css('height', '700px');
                            $("#container").css('height', '1200px');
                        }else {
                            $("#infos").css('width', '500px');
                        }

                        $('#closeMenu').css('display', 'block');
                        $('#openMenu').css('display', 'none');

                        // enleve les details de station
                        $('#pName').remove();
                        $('#pAdress').remove();
                        $('#pPlace').remove();
                        $('#pBike').remove();
                        $('#pInfo').remove();

                        $('<p>', {
                            id: 'pName',
                            text: 'Nom de la station :'
                        }).insertAfter($("#sousH2Infos"));

                        $('#pName').append('<br><span id="stationName">'); // Affiche l'adresse de la station

                        $('<p>', {
                            id: 'pAdress',
                            text: 'Adresse : '
                        }).insertAfter($("#pName"));

                        $('#pAdress').append('<br><span id="stationAddress">'); // Affiche l'adresse de la station

                        $('<p>', {
                            id: 'pPlace',
                            text: 'Place(s) Disponible(s) : '
                        }).insertAfter($("#pAdress"));

                        $('#pPlace').append('<br><span id="stationPlace">'); // Affiche les place libre

                        $('<p>', {
                            id: 'pBike',
                            text: 'Vélo(s) Disponible(s) : '
                        }).insertAfter($("#pPlace"));

                        $('#pBike').append('<br><span id="stationBike">'); // Affiche les Vélos disponibles

                        $('<p>', {
                            id: 'pInfo',
                            text: 'La station est : ',
                            css: {
                                padding: '0 0 8px 0'
                            }
                        }).insertAfter($("#pBike"));

                        $('#pInfo').append('<br><span id="stationInfo">'); // affiche si la station est Ouverte ou Fermer

                        $("#stationName").empty(); // vider les champs des détails de la station
                        $("#stationAddress").empty();
                        $("#stationPlace").empty();
                        $("#stationBike").empty();
                        $("#stationInfo").empty();

                        $("#stationPlace").css("color", "black"); // remise des couleurs en noir
                        $("#stationBike").css("color", "black");

                        $("#stationName").append(station.name);			
                        $("#stationAddress").append(station.address);
                        $("#stationPlace").append(station.available_bike_stands);
                        $("#stationBike").append(station.available_bikes);
                        $("#stationInfo").append(station.status);

                        if (station.status === "OPEN") {
                            $("#stationInfo").css("background", "green");
                            $("#stationInfo").text(" OUVERTE");
                        } else if (station.status === "CLOSED") {
                            $("#stationInfo").css("background", "red");
                            $("#stationInfo").text(" FERMER");
                        };

                        if (station.available_bike_stands === 0) {
                            $("#stationPlace").css("color", "red");
                            $("#stationPlace").text(" AUCUN");
                        };

                        if (station.available_bikes === 0) {
                            $("#stationBike").css("color", "red");
                            $("#stationBike").text(" AUCUN");
                        };
                    });

                    ////////////////////////////////////////////////////////////////////////////////	- END (STATION INFOS) -

                });

                var markerCluster = new MarkerClusterer(context.map, context.tableauMarker, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });

            },

            error: function () {
                console.log("erreur ajax")
            }
        });
    }
}
