class WhiteboardController < ApplicationController
  before_filter :verify_current_user
  
  def index
  end
  
  # Verifies if current_user exists and redirects to authentication action if
  # doesn't
  def verify_current_user
    unless current_user
      redirect = request.fullpath
      session['redirect_to'] = redirect
      redirect_to "/auth/redu"
    else
      if(params[:redu_user_id])
        if (Integer(params[:redu_user_id]) != Integer(session[:user_id]))
          redirect = request.fullpath
          puts "redu id #{params[:redu_user_id]}"
          puts "session id #{session[:user_id]}"
          session['redirect_to'] = redirect
          redirect_to "/auth/redu"
        end
      end
    end
  end
end
