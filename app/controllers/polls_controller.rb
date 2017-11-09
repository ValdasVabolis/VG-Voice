class PollsController < ApplicationController
  def new
  end

  def create
    @options = params.permit(:poll_options_string).split('\n')
    puts "HELLO"
    redirect_to root_path
  end

  private


end
