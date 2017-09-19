class Bar < ApplicationRecord
  validates :name, presence: true
  validates :category, presence: true
  validates :happy_hours, presence: true
  validates :address, presence: true
  validates :state, presence: true
  validates :city, presence: true
  validates :zipcode, presence: true
end
