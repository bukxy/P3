var imageSlider = {
		
	initialisation: function(container) {
		this.$slider = $(container);
		this.$image = this.$slider.find("img");
		this.imageDefault = this.$image.length -1;
		this.i = 0;
		this.$imageActuel = this.$image.eq(this.i);
        
        this.$image.css('display', 'none');
        this.$imageActuel.css('display', 'block');
		
		var context = this;
		this.autoscroll = setInterval(function(){
			context.next(); // lance la méthode next
		}, 20000);
		
		this.eventClick(this);
		this.eventControls(this);
	},
	
	next: function () {
		this.i++;
		
		if( this.i <= this.imageDefault ){
			this.$image.fadeOut(1500);
			this.$imageActuel = this.$image.eq(this.i);
			this.$imageActuel.fadeIn(1500)
		} else {
			this.i = this.imageDefault;
		}
	},
	
	previous: function () {
		this.i--;
		if( this.i >= 0 ){
			this.$image.fadeOut(1500);
			this.$imageActuel = this.$image.eq(this.i);
			this.$imageActuel.fadeIn(1500)
		} else {
			this.i = 0;
		}	
	},

	eventControls: function (context) {
		$(document).keydown(function(touche){

			var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés

			if(appui == 39){ // flèche droite
				context.next();
                
                clearInterval(context.autoscroll);
                context.autoscroll = setInterval(function(){
                    context.next();
                }, 20000);

			} else if (appui == 37){ // flèche gauche
				context.previous();
                
                clearInterval(context.autoscroll);
                context.autoscroll = setInterval(function(){
                    context.previous();
                }, 20000);
			}
		});
	},

	eventClick: function (context) {

		$("#next").click(function(){
			context.next();
			
			clearInterval(context.autoscroll);
			context.autoscroll = setInterval(function(){
				context.next();
			}, 20000);
		});

		$("#back").click(function(){
			context.previous();
			
			clearInterval(context.autoscroll);
			context.autoscroll = setInterval(function(){
				context.previous();
			}, 20000);
		})	
	},
};