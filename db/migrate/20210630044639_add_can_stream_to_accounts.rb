class AddCanStreamToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :can_stream, :boolean, default: false
  end
end