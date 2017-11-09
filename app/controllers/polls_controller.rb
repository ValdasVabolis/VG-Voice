class PollsController < ApplicationController
  def new
  end

  def create
    @options = params.permit(:poll_options_string)
    puts "HELLO"
    puts @options
    redirect_to root_path
  end

  private


end
