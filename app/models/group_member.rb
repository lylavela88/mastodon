# == Schema Information
#
# Table name: group_members
#
#  id         :bigint(8)        not null, primary key
#  group_id   :bigint(8)
#  member_id  :bigint(8)
#  status     :integer          default("invited")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  can_post   :boolean          default(FALSE)
#  is_admin   :integer
#

class GroupMember < ApplicationRecord
  belongs_to :group, class_name: 'Group', foreign_key: :group_id
  belongs_to :member, class_name: 'User', foreign_key: :member_id

  enum status: [:invited, :confirmed]

  after_commit :send_group_invitation, on: :create

  private

  def send_group_invitation
    if group.is_private?
      token = generate_invite_token

      if UserMailer.send_group_invite(member, group.title, token).deliver_later
        update(invite_sent: true)
      end
    else
      self.confirmed!
    end
  end

  def generate_invite_token
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
    crypt.encrypt_and_sign(id)
  end
end
