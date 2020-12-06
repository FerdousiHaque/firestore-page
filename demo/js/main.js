db.collection('settings').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

        // Show tittle in tittle section from firestore
        var tittle_section = doc.data().tittle;
        $("#tittle").append(tittle_section);

        // Show Main tittle from firestore
        $("#company_tittle").append('<span class="js-count-particles"><p>'
                                    + tittle_section +'</p></span>');

        // Show Banner text from firestore
        $("#exploreSite").append(doc.data().banner);

        // Show Email and Mobile in a Div from firestore
        var email_text = doc.data().email;
        var mobile_text = doc.data().mobile;
        $("#email_mobile_div").append('<span id="info-email">'+email_text+'</span> <a href="'
                                        + mobile_text +'"><span>'+ mobile_text +'</span></a>');

        // Show About data from firestore
        $("#about_para").append(doc.data().about);

        // Show Video in iframe from firestore
        $("#video_div").append('<iframe width="100%" height="500px" src="'+doc.data().video
        + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;'
        + 'gyroscope; picture-in-picture" allowfullscreen></iframe>');

        // Show Address, Email, Mobile No of contact section from firestore
        $("#contact_div").append('<h1>'+doc.data().address+'</h1><h2>'
                                + doc.data().fullAddress +'</h2><h2>'
                                +email_text+'<br>'+mobile_text+'</h2>');

        // Show Copyright Text from firestore
        $("#copyright_text").append(doc.data().copyright);
    });
});

// Slider Show from Firestore
var flag = 1; // is used to separate class of active and not active class
db.collection('sliders').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    
    snapshot.docs.forEach(doc => {
        
        var image = doc.data().slider;
        // For first image classs is 'item active'
        if(flag == 1) {
            var imageName = '<div class="item active">'  
                            + '<img src="images/' + image + '"alt="...">'
                            + '<div class="carousel-caption">...</div>'
                            + '</div>';
        } else { // For first image classs is 'item'
            var imageName = '<div class="item">'  
                            + '<img src="images/' + image + '"alt="...">'
                            + '<div class="carousel-caption">...</div>'
                            + '</div>';}
        $("#catousel_div").append(imageName);
        flag = 0;
        
    });
});

// Show ALL Products from firestore
var number = 1; // is used for image & description combination
db.collection('products').orderBy('image').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

    var isOdd = number % 2 == 1;
    var desp = doc.data().description;
    var image = doc.data().image;
    var imageString = '<div class="col-md-6 col-sm-6">'
                    + '<img src="images/' + image + '">'
                    + '</div>';
    var despString = '<div class="col-md-6 col-sm-6 productDetails">'
                    + '<p>' + desp + '</p>'
                    + '</div>';
    var image_and_desp_string =       
   '<div class="row">'
     + (isOdd ? despString : imageString)  //show value first image then description
     + (isOdd ? imageString : despString)   //show value first description then image
     + '</div>';

    $("#product_div").append(image_and_desp_string);
    number = number + 1; // to get different combination of image and description
    });
});

// Show ALL Services One by One from firestore
db.collection('services').orderBy('image').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

       var serviceString = '<div class="col-md-3 column">'
                            +'<img src="images/'+ doc.data().image +'" class="img-responsive">'
                            +'<h2>'+doc.data().heading+'</h2>'
                            +'<p>'+doc.data().details+'</p></div>';

       $("#service_div").append(serviceString);
        
    });
});
