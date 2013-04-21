class SessionController < ApplicationController
  def create
    email = auth_hash["info"]["email"]
    usuario = Usuario.find_by_email(email)

 
    unless usuario
      usuario = Usuario.create do |user|
        user.nome  = auth_hash["info"]["name"]
        user.login = auth_hash["info"]["login"]
        user.email = auth_hash["info"]["email"]
        user.uid   = auth_hash["uid"]
        user.access_token = auth_hash["credentials"]["token"]
      end
    end

    session[:user_id] = usuario.id
    
    if (session[:redirect_to])
      redirect_to session[:redirect_to]
      session[:redirect_to] = nil
    else
       redirect_to '/inicial'
    end
    
   
  end
  
  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
