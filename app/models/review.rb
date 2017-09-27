class Review < ApplicationRecord
  belongs_to :bar

  validates :description, presence: true
  validates :atmosphere, presence: true
  validates :drink_price, presence: true
  validates :bar_id, presence: true
end
