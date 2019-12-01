Rails.application.routes.draw do
  resources :tasks
  get 'welcome/home'
  root 'welcome#home'
end
