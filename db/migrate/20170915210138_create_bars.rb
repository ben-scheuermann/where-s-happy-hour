class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.string :name, null: false
      t.string :happy_hour_info, null: false
      t.string :address, null: false
      t.string :phone_number, null: false
      t.string :website, null: false
    end
  end
end
