class ApplicationController < ActionController::Base
  protect_from_forgery
  protected
  def current_user
    user_id = session[:user_id]
    if (user_id)
    Usuario.find_by_id(user_id) 
  end
  end

  def client(space_id)
    ReduClient.new(current_user.access_token, space_id)
  end
end
