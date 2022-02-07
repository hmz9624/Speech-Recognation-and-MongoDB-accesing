var alertData = `  <div id="alertToggle" 
        style="display: none; width:12rem ; height:4rem ; background-color:rgb(226, 214, 245); position:fixed; top:1rem; right:6rem; border-radius:12%; border:1px solid blue">
        <p style="margin: 0.2rem; margin-left: 1.6rem; color:red; font-size:1rem; font-weight:bold">Component added successfully</p>
    </div>`

export function alertToggle(data, right = "6rem") {
    $("#alertToggle").remove()
    $("body").append(alertData);
    $("#alertToggle").css("right", right)
    $("#alertToggle p").html(data)
    $("#alertToggle").fadeIn(1200).delay(3000).fadeOut(2000, function () {
    })
}

export function rotate(deg) {
    $('.img_1').stop()
    $('.img_1').animate({
        deg: deg
    }, {
        duration: 500,
        step: function (now) {
            $(this).css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}