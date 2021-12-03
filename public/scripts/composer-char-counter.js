$(document).ready(() => {
  const counter = $('.counter')[0];
  const textArea = $('textarea');
  
  $(textArea).on('input', function() {
    let textCount = $(this).val();
    $(counter).text(140 - textCount.length);

    if (textCount.length > 140) {
      $(counter).addClass('redLimit');
    } else {
      $(counter).removeClass('redLimit');
    }
  });
});