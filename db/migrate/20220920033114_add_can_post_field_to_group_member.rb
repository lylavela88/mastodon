class AddCanPostFieldToGroupMember < ActiveRecord::Migration[5.2]
  def change
    add_column :group_members, :can_post, :boolean, default: false
  end
end
