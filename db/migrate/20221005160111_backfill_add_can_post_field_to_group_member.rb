class BackfillAddCanPostFieldToGroupMember < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!

  def change
    GroupMember.in_batches do |relation|
      relation.update_all can_post: false
      sleep(0.1)
    end
  end
end
