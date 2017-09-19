class User < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :role, presence: true

  def admin?
    role == 'admin'
  end
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
