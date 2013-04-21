class ReduClient
  def initialize(access_token, space_id)
    @space_id = space_id
    @access_token = access_token
  end

  def create_canvas(url, name)
    attrs = { :canvas => { :current_url => url, :name => name } }
    connection.post("api/spaces/#{@space_id}/canvas", attrs)
  end
  
  def create_canvas_on_subject(url, name, subject_id)
    attrs = { :lecture => { :current_url => url, :name => name, :type => 'Canvas' } }
    connection.post("api/subject/"+subject_id+"/lectures", attrs)
  end

  def first_subject_id
    response = connection.get("api/spaces/#{@space_id}/subjects")
    response.body.first["id"]
  end

  def remove_canvas(canvas_id)
    connection.delete("api/canvas/#{canvas_id}")
  end
  
  def retorna_disciplinas_possiveis()
    puts json_bonito spec_info("enrollments")
    spec_info("enrollments").each do |atual|
      if ( atual["role"] == "environment_admin" && atual["state"] == "approved") 
        atual["links"].each do |link|
          if ( link["rel"] == "environment" )
            ava = link["href"]
            ava.slice! "http://www.redu.com.br/api/courses/"
            cursos = connection.get("api/environments/#{ava}/courses").body
            puts json_bonito cursos
            
            cursos.each do |curso|
              disciplinas = connection.get("/api/courses/#{curso["id"]}/spaces").body
              puts json_bonito disciplinas
              
              disciplinas.each do |disciplina|
                if (disciplina["id"] == 2958)
                  attrs = { :canvas => { :current_url => 'http://localhost:3000/whiteboard/index', :name => "Novo Canvas 12334" } }
                  connection.post("api/spaces/#{disciplina["id"]}/canvas", attrs)
                end
              end
              
            end
            
          end
        end
        
      end
    end
    
  end
  
  def json_bonito(jsonObj)
    JSON.pretty_generate(jsonObj)
  end
  
  def minhas_info()
    response = connection.get("api/me")
    puts json_bonito response.body
    response.body
  end
  
  def spec_info(rel)
    response = connection.get("api/me").body
    result = ""
    response["links"].each do |posicao|
      if (posicao["rel"] == rel)
        apicall = posicao["href"]
        apicall.slice! "http://www.redu.com.br/"
        result = connection.get(apicall).body
      end
    end
    result
  end

  def create_subject(name)
    attrs = { :subject => { :name => name } }
    connection.post("api/spaces/#{@space_id}/subjects", attrs)
  end

  def create_lecture(subject_id, name, url)
    attrs = { :lecture => { :name => name, :current_url => url, :type => 'Canvas' } }
    connection.post("api/subjects/#{subject_id}/lectures", attrs)
  end

  def connection
    @conn ||= Faraday.new(:url => 'http://redu.com.br') do |faraday|
      faraday.request  :url_encoded
      faraday.response :logger
      faraday.headers['Authorization'] = "OAuth #{@access_token}"
      faraday.adapter  Faraday.default_adapter
      faraday.response :json, :content_type => /\bjson$/
    end
  end
end

# client = ReduClient.new(User.first.access_token, 2467)
# client.create_canvas(2467, "http://www.redu.com.br", "Meu canvas")
