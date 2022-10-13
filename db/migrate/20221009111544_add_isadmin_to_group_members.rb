class AddIsadminToGroupMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :group_members, :is_admin, :integer
  end
end
