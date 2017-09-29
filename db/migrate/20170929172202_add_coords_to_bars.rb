class AddCoordsToBars < ActiveRecord::Migration[5.1]
  def change
    add_column :bars, :coords_lat, :float 
    add_column :bars, :coords_lng, :float
  end
end
