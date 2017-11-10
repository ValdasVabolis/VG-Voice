var Poll = (function() {
  var initialized = false;
  return {
    init: function() {
      if(initialized) return;
      initialized = true;

      // hide poll if current user (browser) has already placed a vote
      var active_poll_id = $('.active-poll').data('id');
      if(Storage.get('voted-on-poll-' + active_poll_id)) {
        $('#poll-vote-form').remove();
      }

      $(document).on('keyup paste', '.poll-option-text', function() {
        var el = $(this);
        if(el.parent().hasClass('created')) return;
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
        setTimeout(function() {
          $('.poll-option input[type=text]').last().focus();
        }, 1);
      });

      $(document).on('click', '.delete-option', function() {
        var el = $(this);
        el.closest('.poll-option').remove();
      });

      $(document).on('click', '#poll-activate', function() {
        var poll = $(this).closest('.poll');
        // send to PollsController#activate
        $.post('/activate_poll', {
          poll_id: poll.attr('data-id')
        }).done(function() {
          window.location.reload();
        });
      });

      $('#poll-form').submit(function(e) {
        e.preventDefault();
        var val = '';
        $.each($('.poll-option-text'), function(i, o) {
          var text = $(o).val().trim();
          if(text !== '') {
            $('#poll-data').val($('#poll-data').val() + text + "\n");
          }
        });
        $('#poll-form').unbind('submit');
        setTimeout(function() {
          $('#poll-form').submit();
        }, 10);
      });
    }
  }
}());
