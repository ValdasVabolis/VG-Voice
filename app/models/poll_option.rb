class PollOption < ApplicationRecord
  belongs_to :poll

  def vote!
    self.score += 1
    self.save
  end
end
