class CreatePollOptions < ActiveRecord::Migration[5.1]
  def change
    create_table :poll_options do |t|
      t.string :title
      t.references :poll, foreign_key: true

      t.timestamps
    end
  end
end
