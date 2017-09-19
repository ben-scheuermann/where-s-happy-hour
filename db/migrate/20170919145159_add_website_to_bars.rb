class AddWebsiteToBars < ActiveRecord::Migration[5.1]
  def change
    add_column :bars, :website, :string
  end
end
