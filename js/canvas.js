var myCanvas = {
    
    initialisation: function() {
        
        this.color = '#000'; // couleur
        this.painting = false; // ecrire
        this.started = false; // commencer a ecrire
        this.width_brush = 1; // epaisseur de la ligne
        this.cursorX, this.cursorY; // coordonnées de la souris
        this.restoreCanvasArray = [];
        this.restoreCanvasIndex = 0;
        
        canvas = $('#canvas');
        context = canvas[0].getContext('2d'); // définir son context 2D
        
        var cont = this;
        
        cont.draw(this);
        cont.options(this);
    },
    
    draw: function () {
        
        // Trait arrondi :
        context.lineJoin = 'round';
        context.lineCap = 'round';

        $('#canvas').mousedown(function(e) {
            this.painting = true;

            this.cursorX = (e.pageX - this.offsetLeft);
            this.cursorY = (e.pageY - this.offsetTop);
        });

        $('#canvas').mouseup(function() {
            this.painting = false;
            this.started = false;
        });

        $('#canvas').mousemove(function(e) {
            if (this.painting) {
                this.cursorX = (e.pageX - this.offsetLeft) - 1; // 1 = décalage du curseur
                this.cursorY = (e.pageY - this.offsetTop) - 10;

                if (!this.started) { // !this.started = (this.started = false)
                    // Je place mon curseur pour la première fois :
                    context.beginPath(); // Commencer a définir la ligne (couleur,épaiseur,de où à où)
                    context.moveTo(this.cursorX, this.cursorY);
                    this.started = true;
                } 
                // Sinon je dessine
                else {
                    context.lineTo(this.cursorX, this.cursorY);
                    context.strokeStyle = this.color;
                    context.lineWidth = this.width_brush;
                    context.stroke();
                }
                $('#booking').css('display', 'block');
            }
        });
        
        $('#canvas').on("touchstart", function(e) {
            this.painting = true;

            this.cursorX = (e.targetTouches[0].pageX - this.offsetLeft);
            this.cursorY = (e.targetTouches[0].pageY - this.offsetTop);
        });

        $('#canvas').on("touchend", function(e) {
            this.painting = false;
            this.started = false;
        });

        $('#canvas').on("touchmove", function(e) {
            e.preventDefault();
            if (this.painting) {
                this.cursorX = (e.targetTouches[0].pageX - this.offsetLeft) - 1; // 1 = décalage du curseur
                this.cursorY = (e.targetTouches[0].pageY - this.offsetTop) - 10;

                if (!this.started) { // !this.started = (this.started = false)
                    // Je place mon curseur pour la première fois :
                    context.beginPath(); // Commencer a définir la ligne (couleur,épaiseur,de où à où)
                    context.moveTo(this.cursorX, this.cursorY);
                    this.started = true;
                } 
                // Sinon je dessine
                else {
                    context.lineTo(this.cursorX, this.cursorY);
                    context.strokeStyle = this.color;
                    context.lineWidth = this.width_brush;
                    context.stroke(); // dessiner
                }
                $('#booking').css('display', 'block');
            }
        });
              
    },
    
    options: function() {
        
        $('#clearCanvas').click(function (){ // Effacer
            context.clearRect(0,0, canvas.width(), canvas.height()); 
            // (0,0) = dimension du carré pour effacer une partie du canvas, 0 = non définni
            // canvas.width() = largeur du canvas
            // canvas.height() = hauteur du canvas
            // (0,0, canvas.width(), canvas.height()) = efface tout le canvas
            $('#booking').css('display', 'none');
        });
        
        $('#booking').click(function (){
            context.clearRect(0,0, canvas.width(), canvas.height());
        })
        
        $('#newBooking').click(function (){
            context.clearRect(0,0, canvas.width(), canvas.height()); 
        });
    }  
}