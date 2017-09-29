class ReviewsController < ApplicationController
  # before_action :authenticate_user!, except: [:index, :show]

  def new
    @review = Review.new
    @bar = Bar.find(params[:bar_id])
  end
  def create
    @review = Review.new(review_params)
    @review.user = current_user
    @bar = Bar.find(params[:bar_id])
    @review.bar = @bar
    if @review.save
      ReviewMailer.new_review(@review).deliver_now
      redirect_to @bar, notice: "Review Submitted Successfully!"
    else
      flash[:notice] = @review.errors.full_messages.join(', ')
      redirect_to @bar
    end
  end

  def edit
    @review = Review.find(params[:id])
    @bar = @review.bar
  end

  def update
    @review = Review.find(params[:id])
    @bar = @review.bar
    if current_user == @review.user
      if @review.update(review_params)
        redirect_to @bar, notice: "Review Successfully Updated!"
      else
        flash[:notice] = @review.errors.full_messages.join(', ')
        render action: 'edit'
      end
    else
      flash[:notice] = "Invalid user. You didn't create this!"
      render action: 'edit'
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @bar = @review.bar
    if current_user == @review.user || current_user.role == 'admin'
      @bar = Bar.find(params[:bar_id])
      @review.destroy
      redirect_to bar_path(@bar)
    else
      flash[:notice] = "Invalid user. You didn't create this!"
      redirect_to @bar
    end
  end

  private

  def review_params
    params.require(:review).permit(:description, :drink_price, :atmosphere, :bar_id)
  end
end
