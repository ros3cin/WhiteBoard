class Usuario < ActiveRecord::Base
  attr_accessible :access_token, :email, :login, :nome, :uid
  has_many :esquemas
end
