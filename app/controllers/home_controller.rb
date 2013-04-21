class HomeController < ApplicationController
  def index
    id_usu_atual = session[:user_id]
    usuario = Usuario.find(id_usu_atual)
    @email = usuario.email
    @login = usuario.login
    @uid = usuario.uid
    (client(1).minhas_info)
    #puts JSON.pretty_generate(client(1).spec_info("enrollments"))
    #client(1).retorna_disciplinas_possiveis()
  end
  def redirecionar
    redirect_to '/auth/redu/'
  end
end
