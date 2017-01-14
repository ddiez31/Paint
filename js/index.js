$(document).ready(function() {

    window.onload = function initCanvas() {

        /*variables*/
        ctx = $(this).attr("myCanvas").getContext("2d");
        var mouseOn = false;
        var startX, startY;
        var midX, midY;
        var endX, endY;
        var tool;
        var color;
        var pencil = "1";
        var bgcolor = "white";

        /*fonction souris*/
        function souris() {
            $('#myCanvas').mousedown(function(e) {
                if (tool == "libre") {
                    mouseOn = true;
                    startX = e.pageX - this.offsetLeft;
                    startY = e.pageY - this.offsetTop;
                    dessin();

                } else {
                    mouseOn = true;
                    startX = e.pageX - this.offsetLeft;
                    startY = e.pageY - this.offsetTop;
                };
            });

            $('#myCanvas').mousemove(function(e) {
                if (tool == "libre") {
                    if (mouseOn) {
                        endX = e.pageX - this.offsetLeft;
                        endY = e.pageY - this.offsetTop;
                        dessin();
                    }

                } else {
                    midX = (e.pageX - this.offsetLeft) - startX;
                    midY = (e.pageY - this.offsetTop) - startY;
                };
            });

            $('#myCanvas').mouseup(function(e) {
                if (tool == "libre") {
                    mouseOn = false;

                } else {
                    endX = e.pageX - this.offsetLeft;
                    endY = e.pageY - this.offsetTop;
                    dessin();
                }
            });

            $('#myCanvas').mouseleave(function(e) {
                if (tool == "libre") {
                    mouseOn = false;

                } else {
                    mouseOn = false;
                };
            });
        };

        /*fonction dessin*/
        function dessin() {
            if (tool == "cercle") {
                rayon = Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2));
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.arc(startX, startY, rayon, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();

            } else if (tool == "rectangle") {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.strokeRect(startX, startY, midX, midY, endX, endY);
                ctx.closePath();
                ctx.stroke();

            } else if (tool == "trait") {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.closePath();
                ctx.stroke();

            } else if (tool == "libre") {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.closePath();
                ctx.stroke();
            };
        };

        /*gestion couleur pinceau*/
        $('button#color').click(function() {
            color = $(this).val();
        });

        /*gestion taille pinceau*/
        $('button#taille').click(function() {
            pencil = $(this).val();
        });

        /*gestion couleur background*/
        $('button#bgcolor').click(function() {
            bgcolor = $(this).val();
            ctx.fillStyle = bgcolor;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });

        /*gestion gomme*/
        $('button#gomme').click(function() {
            $('#myCanvas').mousedown(function(e) {
                mouseOn = true;
                erase(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
            });

            $('#myCanvas').mousemove(function(e) {
                if (mouseOn) {
                    erase(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                }
            });

            $('#myCanvas').mouseup(function(e) {
                mouseOn = false;
            });
            $('#myCanvas').mouseleave(function(e) {
                mouseOn = false;
            });

            function erase(x, y, isDown) {
                if (isDown) {
                    ctx.beginPath();
                    ctx.strokeStyle = bgcolor;
                    ctx.lineWidth = "7";
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.closePath();
                    ctx.stroke();
                }
                lastX = x;
                lastY = y;
            };
        });

        /*gestion effacer*/
        $('button#effacer').click(function effacer() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });

        /*gestion dessin*/
        $('button#bouton').click(function() {
            tool = $(this).data('tools');
            if (tool == "cercle") {
                souris();

            } else if (tool == "rectangle") {
                souris();

            } else if (tool == "trait") {
                souris();

            } else if (tool == "libre") {
                souris();

            } else {
                return false;
            };

        });

        /*gestion enregistrer*/
        $("#save").click(function() {
            window.localStorage.canvasImage = myCanvas.toDataURL();
            var link = document.createElement('a');
            link.download = "image.png";
            link.href = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();
        });
    };
});