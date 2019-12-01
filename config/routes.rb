Rails.application.routes.draw do
  get 'welcome/home'
  root 'welcome#home'
end
