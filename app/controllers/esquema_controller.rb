class EsquemaController < ApplicationController
  def postarNoMural
    puts 'fui chamado!'
    puts params
    novoEsquema = current_user.esquemas.create(:svgstr => params[:esquemaSVG], :nome => params[:nomeCanvas])
    
    if (params[:idSpace])
      client(1).postarEsquemaNoMural(params[:idSpace],esquema_url(:id => novoEsquema.id),params[:nomeCanvas])
    end
    respond_to do |format|
      format.json { render :json => @messages }
      format.html { redirect_to 'whiteboard/index' }
    end
  end
  
  def show
    esquema = Esquema.find_by_id(params[:id])
    if(esquema)
      usuario = esquema.usuario
      if(usuario)
        @nomeUsuario = usuario.nome
      end
      @svg = esquema.svgstr
      @nomeEsquema = esquema.nome
    end
  end
  
end
