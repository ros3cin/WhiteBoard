class HomeController < ApplicationController
  def index
    id_usu_atual = session[:user_id]
    usuario = Usuario.find(id_usu_atual)
    @email = usuario.email
    @login = usuario.login
    @uid = usuario.uid
    @info = client(1).minhas_info
    @spec_info = client(1).spec_info("enrollments")
  end
  def redirecionar
    redirect_to '/auth/redu/'
  end
end
