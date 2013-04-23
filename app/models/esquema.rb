class Esquema < ActiveRecord::Base
  belongs_to :usuario
  attr_accessible :jsonstr, :nome, :svgstr
end
