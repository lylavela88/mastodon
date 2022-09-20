class AddGroupReferenceToStatus < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!

  def change
    add_reference :statuses, :group, index: false
    add_index :statuses, :group_id, algorithm: :concurrently
  end
end