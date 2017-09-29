class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :description
      t.integer :atmosphere
      t.integer :drink_price
    end
  end
end
