class PollsController < ApplicationController
  def index
    @polls = Poll.all
  end

  def new
    @poll = Poll.new
  end

  def create
    options = params[:poll][:poll_options_string].strip.split(/\s+/).map do |opt|
      PollOption.new(title: opt)
    end

    poll = Poll.new(poll_options: options) do |p|
      p.title = params[:poll][:title]
      p.body = params[:poll][:body]
    end

    poll.save
    redirect_to root_path
  end

  def activate
    unless (poll = Poll.where(active: true)).blank?
      poll.first.update_attribute(:active, false)
    end

    if Poll.find(params[:poll_id]).update_attribute(:active, true)
      puts "Poll succesfully set as active"
    else
      puts "Error occured while setting active poll"
    end
  end

  def vote_poll
    @poll = Poll.where(active: true).first
    option = @poll.poll_options.find_by_title(params[:poll])
    option.vote!
  end
end
