Rails.application.routes.draw do
  # root 'bars#index'
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :bars, only: [:index, :show]

  namespace :api do
     namespace :v1 do
      resources :bars, only: [:index, :show]
    end
  end
end
