class AddCanPostFieldToGroupMember < ActiveRecord::Migration[5.2]
  def up
    add_column :group_members, :can_post, :boolean
    change_column_default :group_members, :can_post, false
  end

  def down
    remove_column :group_members, :can_post
  end
end
