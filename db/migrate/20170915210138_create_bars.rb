class CreateBars < ActiveRecord::Migration[5.1]
  def change
    create_table :bars do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :happy_hours, null: false
      t.string :address, null: false
      t.string :state, null: false
      t.string :city, null: false
      t.string :zipcode, null: false
    end
  end
end
