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
    poll = Poll.where(active: true).first.update_attribute(:active, false)

    if Poll.find(params[:poll_id]).update_attribute(:active, true)
      puts "Poll succesfully set as active"
    else
      puts "Error occured while setting active poll"
    end
  end
  # TODO
  def vote
    poll = Poll.where(active: true).first
  end
end
