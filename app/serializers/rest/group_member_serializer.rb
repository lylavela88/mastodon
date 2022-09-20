# frozen_string_literal: true

class REST::GroupMemberSerializer < ActiveModel::Serializer
  attributes :group_id, :member_id, :account_id, :status

  def id
    object.id.to_s
  end
end
