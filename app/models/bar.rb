class Bar < ApplicationRecord
  has_many :reviews

  validates :name, presence: true
  validates :happy_hour_info, presence: true
  validates :address, presence: true
end
