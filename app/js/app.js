AOS.init({
  easing: 'ease-out-back',
  duration: 1000,

});

// get list values
function getFilterVal(blockID) {
  var blockList = $(document).find('.filter-item[data-id="'+blockID+'"]'),
  blockName = blockList.find('.block-title-text').text(),
  itemValue = {'name':blockName};

  // check type of filter
  if (blockList.hasClass('filter-input__switcher')) {
    //get active switcher
    itemValue['value'] = blockList.find('input:checked').data('value');
  }
console.log(itemValue);
  // check is empty filter values
  //$(document).find('.filter-item[data-id="'+blockID+'"]');



  if (blockList.is(':empty')) {
    console.log('Empty block');

  } else {
    console.log('has elements');
  }
}


// function change result in block
function changeResultFilter(blockID) {
  console.log('Filter block');
  console.log(blockID);
  // check isset in results
  var resBlock = $(document).find('.filter-result-block .result-block__items .result__item[data-filter="'+blockID+'"]'),
    isEmptyFilter = true,
    blockList = $(document).find('.filter-item[data-id="'+blockID+'"]'),
    blockName = blockList.find('.block-title-text').text(),
    itemValue = {'name':blockName, 'value': []};


  // check filter

  // check type of filter
  if (blockList.hasClass('filter-input__switcher')) {
    //get active switcher
    if (blockList.find('input:checked').data('value') == undefined) {
      itemValue['value'] = [];
    } else {
      itemValue['name'] = blockName;
      itemValue['value'] = [blockList.find('input:checked').data('value')];
    }
  } else if (blockList.hasClass('filter-input__select')) {
    if (blockList.hasClass('select-multi')) {
      itemValue['name'] = blockList.find('.input-title').text();


      blockList.find('.select-items__wrapper input:checked').each(function(key, val) {
        itemValue['value'].push($(this).next().text());
      });

      console.log('select multi checked');
      console.log(itemValue['value']);
    }

  }


  // запихнуть в функцию

  if (resBlock.length !== 0) {
    if (itemValue['value'].length === 0) {
      resBlock.remove();
    } else {
      resBlock.remove();
      var resItemValues = '';

      $.each(itemValue['value'], function(key, val) {
        resItemValues = resItemValues + '<div class="value__text" data-value="'+blockID+'">'+val+'</div>';
      });
      var resItemBlock = '<div class="result__item" style="order:'+blockList.data('order')+'" data-filter="'+blockID+'">\n' +
        '              <div class="result-item__title">'+itemValue['name']+'</div>\n' +
        '              <div class="result-values__block">\n' + resItemValues +
        '              </div>\n' +
        '            </div>';
      console.log(resItemBlock);
      $(document).find('.filter-result-block .result-block__items').append(resItemBlock);

    }

  } else {
    if (itemValue['value'].length !== 0) {
      var resItemValues = '';

      console.log('res');
      console.log(itemValue['value']);

      $.each(itemValue['value'], function(key, val) {
        resItemValues = resItemValues + '<div class="value__text" data-value="'+blockID+'">'+val+'</div>';
      });
      var resItemBlock = '<div class="result__item" style="order:'+blockList.data('order')+'" data-filter="'+blockID+'">\n' +
        '              <div class="result-item__title">'+itemValue['name']+'</div>\n' +
        '              <div class="result-values__block">\n' + resItemValues +
        '              </div>\n' +
        '            </div>';
      console.log(resItemBlock);
      $(document).find('.filter-result-block .result-block__items').append(resItemBlock);
    }

  }



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
  $('.filter-result-block').show();

  // show/hide additionnal filters
  $(document).on('click', '.filter-btn.additional-btn', function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.additional-filter__wrapper').hide();
      $('.filter-result-block').show();
    } else {
      $(this).addClass('active');
      $('.additional-filter__wrapper').show();
      $('.filter-result-block').hide();
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
    changeResultFilter(blkID);

  });

  // remove result item
  $(document).on('click', '.result-item__remove', function(){
    var itemID = $(this).parent().data('id');

    $(document).find('.filter-item .input-radio[value="'+itemID+'"]').prop('checked', false);

    $(this).parent().remove();
  });


  // on change switcher (YES/NO)
  $(document).on('click', '.filter-input__switcher input', function() {
    changeResultFilter($(this).prop('id'));

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
