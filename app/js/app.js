AOS.init({
  easing: 'ease-out-back',
  duration: 1000,

});

// function change result in block
function changeResult(block, blockTitle, blockItems) {

}


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


  $('.additional-filter__wrapper').hide();

  // show/hide additionnal filters
  $(document).on('click', '.filter-btn.additional-btn', function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.additional-filter__wrapper').hide();
    } else {
      $(this).addClass('active');
      $('.additional-filter__wrapper').show();
    }
  });

  // multiply filters
  $(document).on('click', '.select-item input', function() {

    var el = $(this),
      blkID = el.parent().parent().data('block'),
      slct = $(document).find('.filter-item[data-id="'+blkID+'"]'),
      resBlock = slct.find('.filter-item__result');

    if (el.hasClass('input-radio')) {
      if ($(this).is(':checked')) {
        var resEl = '<div class="result-item" data-id="'+el.val()+'">' +
          '                <span class="result-item__text">'+el.next().text()+'</span>' +
          '                <span class="result-item__remove">' +
          '                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">' +
          '                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>' +
          '                  </svg>' +
          '                </span>' +
          '              </div>';

        resBlock.append(resEl);
        console.log('checked '+el.val());
      } else {
        console.log('not checked '+el.val());
        resBlock.find('.result-item[data-id="'+el.val()+'"]').remove();
      }
    }

  });

  // remove result item
  $(document).on('click', '.result-item__remove', function(){
    var itemID = $(this).parent().data('id');

    $(document).find('.filter-item .input-radio[value="'+itemID+'"]').prop('checked', false);

    $(this).parent().remove();
  });

  // search in select
  $(document).on('keyup', '.items-search_input', function() {
    var phrase = $(this).val().toLowerCase(),
      selBlock = $(this).parent().parent().find('.select-items__wrapper');

    selBlock.find('.select-item').each(function(el) {
      var txtFind = $(this).find('.block-title-text').text().toLowerCase();

      if (txtFind.indexOf(phrase) != -1) {
        $(this).show();
        console.log('yes '+txtFind);
      } else {
        $(this).hide();
        console.log('no '+txtFind);
      }

    });
  });

});
