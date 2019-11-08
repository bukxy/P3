var booking = {
    
    futurDate: null,
	
	initialisation: function() { 
          
        var context = this;    
        
        context.countdown();
        context.event();
        
		$('#booking').click(function () {           
            context.storage();
            context.countdown();
            $('#newBooking').css('display', 'block');
            $('#canvasDiv').css('display', 'none');
		});
	},
	
	storage: function() {
        
        sessionStorage.setItem('name', $('#stationName').text());
        sessionStorage.setItem('dateBooking', Date.now());

	},
    
    countdown: function () {  

        this.timer = setInterval(function() {
            
            var dateReservation = sessionStorage.getItem('dateBooking');
            
            var valueTimer = 1200000; // 20 minutes

            this.futurDate = parseInt(dateReservation) + valueTimer;
            
            // Date futur - Date actuelle
            this.expirationTime =  new Date(this.futurDate - Date.now()); 
            
            minutes = expirationTime.getMinutes();
            seconds = expirationTime.getSeconds();
            
            if (this.futurDate > Date.now()) { 
                $('#result').html('<p>1 vélo réservé à la station : '+ sessionStorage.getItem('name') +'<br>pendant ' + minutes + ' minutes ' + seconds + ' secondes</p>');

                $('#expirationInfos').css('display', 'block');
                $('#newBooking').css('display', 'block');
                $('#cancelBooking').css('display', 'block');
            }
            else if (this.futurDate < Date.now()) {         
                $('#result').html('<p>Votre réservation pour la station : '+ sessionStorage.getItem('name') +' est arriver a expiration</p>');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('dateBooking');
                clearInterval(this.timer);
                
                $('#newBooking').css('display', 'block');
                $('#cancelBooking').css('disabled', 'true');
            } else {
                $('#boutonsCanvas').css('display', 'block');
                $('#newBooking').css('display', 'none');
            }
        },1000);
        
	},
    
    event: function() {
    
        $('#cancelBooking').click(function(){
            if (sessionStorage.getItem('name')) {
                clearInterval(this.timer);

                $('#result').html('<p>Votre réservation pour la station: '+ sessionStorage.getItem('name') +' à bien était annuler</p>');

                sessionStorage.removeItem('name');
                sessionStorage.removeItem('dateBooking');
                
                $('#canvasDiv').css('display', 'block');
                $('#cancelBooking').css('display', 'none');
            }
            
        });
        
        $('#newBooking').click(function(){
            
            var checkNewBooking = prompt('Toute nouvelle réservation annulera la précédente, tapez "oui" pour continuer')
            
            var tiny = checkNewBooking.toLowerCase();
            
            if (tiny === "oui") {
                clearInterval(this.timer);
            
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('dateBooking');
                
                $('#expirationInfos').css('display', 'none');
                $('#newBooking').css('display', 'none');
                $('#canvasDiv').css('display', 'block');
                
                window.location.reload();
            }
            
        });
        
        $('#openMenu').click(function (){ 

            $('#newBooking').css('display', 'block');
            $("#infos").css('width', '500px');
            $('#closeMenu').css('display', 'block');
            $('#openMenu').css('display', 'none');  
        });
    
        $('#closeMenu').click(function (){
            $('#newBooking').css('display', 'none');
            $("#infos").css('width', '0px');
            $('#openMenu').css('display', 'block');
            $('#closeMenu').css('display', 'none');
        });
    }
}		