Rails.application.routes.draw do
  root 'bars#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :bars, only: [:index, :show]
end
