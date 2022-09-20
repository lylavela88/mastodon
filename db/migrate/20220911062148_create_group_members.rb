class CreateGroupMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :group_members do |t|
      t.references :group, index: true, foreign_key: { to_table: :groups }
      t.references :member, index: true, foreign_key: { to_table: :users }
      t.integer    :status, default: 0

      t.timestamps
    end
  end
end
