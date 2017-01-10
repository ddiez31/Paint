$(document).ready(function() {
    $(':button').click(function() {
        var btnColor = $(this).val();
        console.log(btnColor);
    });
});

window.onload = function initCanvas() {

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



function dessin(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = btnColor;
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;



}



function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};