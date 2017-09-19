class Api::V1::BarsController < ApplicationController
  def index
    bar_data = {
      bars: Bar.all
      # current_user: current_user
    }
    render json: bar_data
  end

  def show
    render json: Bar.find(params[:id])
  end
end
