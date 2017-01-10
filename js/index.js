$(document).ready(function() {

    window.onload = function initCanvas() {

        /*gestion souris*/
        var mouseOn = false;
        var lastX, lastY;
        ctx = $(this).attr("myCanvas").getContext("2d");

        $('#myCanvas').mousedown(function(e) {
            mouseOn = true;
            dessin(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        });

        $('#myCanvas').mousemove(function(e) {
            if (mouseOn) {
                dessin(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
            }
        });

        $('#myCanvas').mouseup(function(e) {
            mouseOn = false;
        });
        $('#myCanvas').mouseleave(function(e) {
            mouseOn = false;
        });
    };

    /*gestion couleur pinceau*/
    $('button#color').click(function() {
        color = $(this).val();
    });

    /*gestion taille pinceau*/
    pencil = "1";
    $('button#taille').click(function() {
        pencil = $(this).val();
    });

    /*gestion dessin*/
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
    }

    /*gestion couleur background*/
    $('button#bgcolor').click(function() {
        bgcolor = $(this).val();
        ctx.fillStyle = bgcolor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    /*gestion effacer*/
    $('button#effacer').click(function effacer() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });


});