class Review < ApplicationRecord
  belongs_to :bar

  validates :bar_id, presence: true
end
