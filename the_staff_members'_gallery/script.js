/*
 * script.js
 * Script module for Gallery.
*/

/*jslint browser : true,   continue : true,   white    : true,
  devel  : true,   indent : 2,      maxerr   : 50, 
  newcap : true,   nomen  : true,   plusplus : true,
  regexp : true,   sloppy : true,   vars     : false
*/

/*global $, module */



var module = (function () {
  //  ----------------- BEGIN MODULE SCOPE VARIABLES -----------------
  var 
    // Set constants.
    configMap = {
      positive_rotate_deg  : "rotate( 225deg )",
      negative_rotate_deg  : "rotate( -45deg )",
      transform_rotate : {
        "transform"  : "",
        "position"   : "relative",
        "top"        : "-85px",
        "text-align" : "center",
        "color"      : "white"
      },
      style_for_cliked_button : {
        "background-color" : "#5c50be",
        "color"            : "white",
        "border-radius"    : "30px"
      },
      style_for_adjacent_button : {
        "background-color" : "white",
        "color"            : "#5c50be"
      },
      id_left_button  : "leftButton",
      id_right_button : "rightButton"
    },
    // Declare all other module scope variables.
    $togglePhotos, $toggleButtons,
    handlerInHover,  onHoveredElement,  changePhoto, 
    handlerOutHover, outHoveredElement, changeBackPhoto, 
    handlerOnClickButton, changeButton, clickedButton, compareIdButtons,
    initModule
  ;
  //  ----------------- END MODULE SCOPE VARIABLES -----------------



  //  ------------------- BEGIN DOM METHODS ------------------------
  // Begin DOM method /changePhoto/
  // changes a black and white photo on a color photo.
  //
  changePhoto = function ( topSpan ) {
    var
      img_src       = topSpan.find( "img" ).attr( "src" ),
      img_alt       = topSpan.find( "img" ).attr( "alt" ),
      new_img_src   = img_src.slice( 0, -4 ) + "1.png",
      div_genCenter = topSpan.closest( "#centerColumn" ).attr( "id" )
    ;

    topSpan.find( "img" ).attr( "src", new_img_src );
    topSpan.append( "<h1>" + img_alt + "</h1>" );

    if ( !div_genCenter ) {
      configMap.transform_rotate.transform = configMap.positive_rotate_deg;
      topSpan.find( "h1" ).css( configMap.transform_rotate );
    } else {
      configMap.transform_rotate.transform = configMap.negative_rotate_deg;
      topSpan.find( "h1" ).css( configMap.transform_rotate );
    }
  };
  // End DOM method /changePhoto/



  // Begin DOM method /changeBackPhoto/
  // changes back on a black and white photo.
  //
  changeBackPhoto = function ( div_topSpan ) {
    var
      img_src     = div_topSpan.find( "img" ).attr( "src" ),
      new_img_src = img_src.slice(0, -5) + ".png"
    ;
    div_topSpan.find( "img" ).attr( "src", new_img_src );
    div_topSpan.find( "h1" ).remove();
  };
  // End DOM method /changeBackPhoto/



  // Begin DOM method /changeButton/
  // changes a style between two buttons.
  //
  changeButton = function ( clickedButton, adjacentButton ) {
    clickedButton.find("a").css(  configMap.style_for_cliked_button );
    adjacentButton.find("a").css( configMap.style_for_adjacent_button ); 
  };
  // End DOM method /changeButton/
  // -------------------- END DOM METHODS -------------------------



  // -------------------- BEGIN EVENT HANDLERS  -------------------
  // Begin Event handler /handlerInHover/
  // handles the mouseenter event and calls changePhoto.
  //
  handlerInHover = function () {
    onHoveredElement = $( this );
    changePhoto( onHoveredElement );
  };
  // End Event handler /handlerInHover/



  // Begin Event handler /handlerOutHover/
  // handles the mouseleave event and calls changeBackPhoto.
  //
  handlerOutHover = function () {
    outHoveredElement = $( this );
    changeBackPhoto( outHoveredElement );
  };
  // End Event handler /handlerOutHover/



  // Begin Event handler /handlerOnClickButton/
  // handles the click event and calls changeButton.
  //
  handlerOnClickButton = function () {
    clickedButton    = $( this );
    compareIdButtons = clickedButton.attr("id") === configMap.id_right_button;

    if ( compareIdButtons ) {
      changeButton( clickedButton, $("#" + configMap.id_left_button) );
    } else {
      changeButton( clickedButton, $("#" + configMap.id_right_button) );
    }

    return false;
  };
  // End Event handler /handlerOnClickButton/
  // -------------------- END EVENT HANDLERS  -------------------



  // ------------------ BEGIN PUBLIC METHODS --------------------
  // Begin Public method /initModule/
  // binds handlers to a hover and a click.
  // 
  initModule = function () {
    $togglePhotos = $( ".person" );
    $togglePhotos.hover( handlerInHover, handlerOutHover );

    $toggleButtons = $( "#leftButton, #rightButton" );
    $toggleButtons.click( handlerOnClickButton );
  };
  // End Public method /initModule/
  // ------------------ END PUBLIC METHODS --------------------

  return { initModule : initModule };
}( $ ));
  
// Start once DOM is ready.
//  
$( function () { module.initModule(); });
