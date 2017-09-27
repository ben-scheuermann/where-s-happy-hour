class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :description, null: false
      t.integer :drink_price, null: false
      t.integer :atmosphere, null: false
      t.integer :bar_id, null: false

      t.timestamps null: false
    end
  end
end
