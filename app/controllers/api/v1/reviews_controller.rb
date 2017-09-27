class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Review.where(bar_id: params[:bar_id])
  end
  def show
    # render json: Review.find(params[:id])
    review_data = {
      review: Review.find(params[:id]),
      current_user: current_user
     }
    render json: review_data
  end
  def create
    review = Review.new(parse_request)
    if review.save
      render json: Review.all
      # redirect_to "/bars/#{params[:bar_id]}"
    else
      render json: nil
    end
  end

  private

  def parse_request
    json = JSON.parse(request.body.read)
    json['drink_price'] = json['drinksPrice']
    json.delete('drinksPrice')
    json['drink_price'] = json['drink_price'].to_i
    json['atmosphere'] = json['atmosphere'].to_i
    json['bar_id'] = params[:bar_id].to_i
    # binding.pry
    return json
    # params.require(json).permit(:description, :drink_price, :atmosphere, :bar_id)
  end
end
