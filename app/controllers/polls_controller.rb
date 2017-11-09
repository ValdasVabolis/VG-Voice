class PollsController < ApplicationController
  def new
    @poll = Poll.new
  end

  def create
    options = params[:poll][:poll_options_string].split(/\s+/).map do |opt|
      PollOption.new(title: opt)
    end
    poll_title = params[:title]
    poll_body = params[:body]
    poll = Poll.new(poll_options: options)

    poll.save

    redirect_to root_path
  end
end
