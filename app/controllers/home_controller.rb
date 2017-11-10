class HomeController < ApplicationController
  def index
    @active_poll = Poll.where(active: true).first
  end
end
