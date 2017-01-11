$(document).ready(function() {

    window.onload = function initCanvas() {

        var mouseOn = false;
        var lastX, lastY;
        ctx = $(this).attr("myCanvas").getContext("2d");
        rect = {};
        circle = {};


        /*gestion couleur pinceau*/
        $('button#color').click(function() {
            color = $(this).val();
        });

        /*gestion taille pinceau*/
        pencil = "1";
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
        $('button#gomme').click(function efface(x, y, isDown) {
            ctx.beginPath();
            ctx.strokeStyle = bgcolor;
            ctx.lineWidth = pencil;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        });

        /*gestion effacer*/
        $('button#effacer').click(function effacer() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });

        /*gestion dessin libre*/
        $('button#libre').click(function() {
            $('#myCanvas').mousedown(function(e) {
                mouseOn = true;
                dessin(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
            });

            $('#myCanvas').mousemove(function(e) {
                if (mouseOn) {
                    dessin(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                }
            });

            $('#myCanvas').mouseup(function(e) {
                mouseOn = false;
            });
            $('#myCanvas').mouseleave(function(e) {
                mouseOn = false;
            });

            function dessin(x, y, isDown) {
                if (isDown) {
                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.lineWidth = pencil;
                    ctx.lineJoin = "round";
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.closePath();
                    ctx.stroke();
                }
                lastX = x;
                lastY = y;
            };
        });

        /*gestion rectangle*/
        $('button#rectangle').click(function() {
            $('#myCanvas').mousedown(function(e) {
                rect.startX = e.pageX - this.offsetLeft;
                rect.startY = e.pageY - this.offsetTop;
                mouseOn = true;
            });

            $('#myCanvas').mousemove(function(e) {
                if (mouseOn) {
                    rect.w = (e.pageX - this.offsetLeft) - rect.startX;
                    rect.h = (e.pageY - this.offsetTop) - rect.startY;
                }
            });

            $('#myCanvas').mouseup(function(e) {
                rect.endX = e.pageX - this.offsetLeft;
                rect.endY = e.pageY - this.offsetTop;
                rectangle();
                mouseOn = false;
            });
            $('#myCanvas').mouseleave(function(e) {
                mouseOn = false;
            });

            function rectangle() {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h, rect.endX, rect.endY);
                ctx.closePath();
                ctx.stroke();
            };
        });

        /*gestion cercle*/
        $('button#cercle').click(function() {
            $('#myCanvas').mousedown(function(e) {
                circle.startX = e.pageX - this.offsetLeft;
                circle.startY = e.pageY - this.offsetTop;
                mouseOn = true;
            });

            $('#myCanvas').mousemove(function(e) {
                if (mouseOn) {
                    circle.w = (e.pageX - this.offsetLeft) - circle.startX;
                    circle.h = (e.pageY - this.offsetTop) - circle.startY;
                }
            });

            $('#myCanvas').mouseup(function(e) {
                circle.endX = e.pageX - this.offsetLeft;
                circle.endY = e.pageY - this.offsetTop;
                cercle();
                mouseOn = false;
            });

            $('#myCanvas').mouseleave(function(e) {
                mouseOn = false;
            });

            function cercle() {
                rayon = Math.sqrt(Math.pow((circle.startX - circle.endX), 2) + Math.pow((circle.startY - circle.endY), 2));
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.arc(circle.startX, circle.startY, rayon, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.stroke();
            }
        });

        /*gestion enregistrer*/
        $('button#save').click(function() {
            function saveImage() {
                var ua = window.navigator.userAgent;
                if (ua.indexOf("Chrome") > 0) {
                    // save image without file type
                    var canvas = $('#myCanvas');
                    document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

                    // save image as png
                    var link = document.createElement('a');
                    link.download = "image.png";
                    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
                    link.click();
                } else {
                    alert("Veuillez utiliser le navigateur Chrome");
                }
            };
        });






    };
});