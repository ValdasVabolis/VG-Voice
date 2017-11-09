class CreatePolls < ActiveRecord::Migration[5.1]
  def change
    create_table :polls do |t|
      t.boolean :active
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
