var Poll = (function() {
  var initialized = false;
  return {
    init: function() {
      if(initialized) return;
      initialized = true;
      $(document).on('keyup paste', '.poll-option-text', function() {
        var el = $(this);
        el.parent().toggleClass('ready', el.val().trim() !== '');
      });

      $(document).on('click', '.add-option, .delete-option', function(e) {
        e.preventDefault();
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

      $('#poll-form').submit(function(e) {
        e.preventDefault();
        var val = '';
        var data = [];
        $.each($('.poll-option-text'), function(i, o) {
          var text = $(this).val().trim();
          if(text !== '') {
            data.push(text);
          }
        });
        var string = data.join("\n");
        $('#poll-data').val(string);
        $('#poll-form').unbind('submit').submit();
      });
    }
  }
}());
