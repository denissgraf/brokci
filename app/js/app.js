AOS.init({
  easing: 'ease-out-back',
  duration: 1000,

});
$(document).ready(function() {


  setTimeout (function(){
    var preloader = $(document).find('.preloader');
    preloader.addClass('hide');
  }, 5000);


});
