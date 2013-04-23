class HomeController < ApplicationController
  def index
    id_usu_atual = session[:user_id]
    usuario = Usuario.find_by_uid(id_usu_atual)

    #client(1).minhas_info
    #puts JSON.pretty_generate(client(1).spec_info("enrollments"))
    @disciplinas = client(1).retorna_disciplinas_possiveis()
    @path_canvas = url_for(:controller => 'whiteboard', :action => 'index', :only_path => false)
    
    @sucesso = params[:sucesso]
  end
  
  def adicionarCanvas
    disciplinas = client(1).retorna_disciplinas_possiveis()
    sucesso = false
    disciplinas.each do |disciplina|
      if(disciplina["name"] == params[:disciplina_escolhida])
        path_canvas = url_for(:controller => 'whiteboard', :action => 'index', :only_path => false)
        client(1).criar_canvas_disciplina(path_canvas,disciplina["id"])
        sucesso = true
      end
    end
    
    params[:sucesso] = sucesso
    redirect_to :controller => 'home', :action => 'index', :params => params
  end
  
  def redirecionar
    redirect_to '/auth/redu/'
  end
end
