Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'site#index'

  get 'api/memes', to: 'memes#index'
  get 'api/memes/:id', to: 'memes#show'
  post 'api/memes', to: 'memes#create'
  delete 'api/memes/:id', to: 'memes#delete'
  put 'api/memes/:id', to: 'memes#update'
end
