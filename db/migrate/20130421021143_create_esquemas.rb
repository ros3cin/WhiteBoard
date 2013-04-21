class CreateEsquemas < ActiveRecord::Migration
  def change
    create_table :esquemas do |t|
      t.string :nome
      t.string :jsonstr
      t.binary :pngbin
      t.references :usuario

      t.timestamps
    end
    add_index :esquemas, :usuario_id
  end
end
