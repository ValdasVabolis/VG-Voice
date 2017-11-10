module PollsHelper
  def poll_row(poll, &block)
    cls = ['poll']
    cls << 'poll-active' if poll.active?
    content_tag :div, capture(&block), class: cls, data: { id: poll.id }
  end
end
