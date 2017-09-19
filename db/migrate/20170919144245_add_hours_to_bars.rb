class AddHoursToBars < ActiveRecord::Migration[5.1]
  def change
    add_column :bars, :hours, :string
    change_column :bars, :hours, :string, null: false
  end
end
