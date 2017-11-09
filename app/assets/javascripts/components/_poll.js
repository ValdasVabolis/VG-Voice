var Poll = (function() {
  return {
    init: function() {
      $(document).on('keyup paste', '.poll-option-text', function() {
        var el = $(this);
        el.parent().toggleClass('ready', el.val().trim() !== '');
      });

      $(document).on('click', '.add-option', function() {
        var el = $(this);
        var row = $('<div class="poll-option"></div>');
        row.append($('<input type="text" class="poll-option-text">'));
        row.append($('<button class="add-option">+</button>'));
        row.append($('<button class="delete-option">x</button>'));
        el.parent().removeClass('ready').addClass('created');
        el.closest('.poll-options').append(row);
      });

      $(document).on('click', '.delete-option', function() {
        var el = $(this);
        el.closest('.poll-option').remove();
      });

      $('button[type=submit]').on('click', function(e) {
        e.preventDefault();
        var val = '';
        $.each($('.poll-option-text'), function(i, o) {
          var text = $(this).val().trim();
          if(text !== '') {
            val += text + "\n";
          }
        });
        $('input#poll_data').val(val);
        $('button[type=submit]').unbind();
        $('#poll-form').submit();

      });
    }
  }
}());

$(function() {
  Poll.init();
});
