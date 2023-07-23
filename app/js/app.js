AOS.init({
  easing: 'ease-out-back',
  duration: 1000,

});
$(document).ready(function() {


  setTimeout (function(){
    var preloader = $(document).find('.preloader');
    preloader.addClass('hide');
  }, 5000);



  $(document).mouseup( function(e){ // событие клика по веб-документу
    var div = $( ".filter-input__select.opened" ); // тут указываем ID элемента
    if ( !div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
      div.removeClass('opened'); // скрываем его
    }
  });

  $(document).on('click', '#checkOperation input', function() {
    $(document).find('.filter-item.check-type[data-operation!="'+$(this).val()+'"]').addClass('hidden');
    $(document).find('.filter-item.check-type[data-operation="'+$(this).val()+'"]').removeClass('hidden');
  });

  $(document).on('click', '.filter-input__select input[type="text"]', function() {
    var selectBlock = $(this).parent();

    selectBlock.toggleClass('opened');
  });

  function discharge(){
    $('input.price-input').val(String($('input.price-input').val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  }
  discharge();
  $('input.price-input').keyup(function(){
    $(this).val(String($(this).val().replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
  });

  $(document).on('click', '.range-items .filter-input__clear', function() {
    $(this).parent().find('input').val('');
  });

  // multiply filters
  $(document).on('click', '', function() {

  });

});
