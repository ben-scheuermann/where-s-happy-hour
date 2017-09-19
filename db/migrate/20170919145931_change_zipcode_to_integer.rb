class ChangeZipcodeToInteger < ActiveRecord::Migration[5.1]
  def up
    change_column :bars, :zipcode, :integer
  end

  def down
    change_column :bars, :zipcode, :string
  end
end
