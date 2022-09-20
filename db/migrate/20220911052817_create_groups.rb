class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string  :title, null: false, default: ''
      t.text    :description, null: false, default: ''
      t.string  :category, null: false, default: ''
      t.boolean :is_private, default: false
      t.attachment :cover_image
      t.references :owner, index: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
