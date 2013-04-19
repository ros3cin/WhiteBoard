class CreateUsuarios < ActiveRecord::Migration
  def change
    create_table :usuarios do |t|
      t.integer :uid
      t.string :login
      t.string :nome
      t.string :email
      t.string :access_token

      t.timestamps
    end
  end
end
