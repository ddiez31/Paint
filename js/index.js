$(document).ready(function() {

    window.onload = function initCanvas() {

        /*gestion souris*/
        var mouseOn = false;
        var lastX, lastY;
        ctx = $(this).attr("myCanvas").getContext("2d");
        rect = {};
        drag = false;





        /*gestion couleur pinceau*/
        $('button#color').click(function() {
            color = $(this).val();
        });

        /*gestion taille pinceau*/
        pencil = "1";
        $('button#taille').click(function() {
            pencil = $(this).val();
        });

        /*gestion dessin libre*/
        $('button#libre').click(function() {
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

        /*gestion rectangle*/
        $('button#rectangle').click(function() {
            $('#myCanvas').mousedown(function(e) {
                rect.startX = e.pageX - this.offsetLeft;
                rect.startY = e.pageY - this.offsetTop;
                drag = true;
                /* mouseOn = true;
                 rectangle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);*/
            });

            $('#myCanvas').mousemove(function(e) {
                if (drag) {
                    rect.w = (e.pageX - this.offsetLeft) - rect.startX;
                    rect.h = (e.pageY - this.offsetTop) - rect.startY;

                }
                /*if (mouseOn) {
                    rectangle(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
                }*/
            });

            $('#myCanvas').mouseup(function(e) {
                rect.endX = e.pageX - this.offsetLeft;
                rect.endY = e.pageY - this.offsetTop;
                draw();
                drag = false;
                /*mouseOn = false;*/
            });
            $('#myCanvas').mouseleave(function(e) {
                drag = false;
                /*mouseOn = false;*/
            });

            function draw() {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = pencil;
                ctx.lineJoin = "round";
                ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h, rect.endX, rect.endY);
                ctx.closePath();
                ctx.stroke();
            };


        });





    };
});