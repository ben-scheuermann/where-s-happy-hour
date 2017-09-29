class AddTownToBars < ActiveRecord::Migration[5.1]
  def change
    add_column :bars, :town, :string
  end
end
