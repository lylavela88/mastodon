# frozen_string_literal: true

class REST::GroupMemberSerializer < ActiveModel::Serializer
  attributes :group_id, :member_id, :status

  belongs_to :group, class_name: 'Group', foreign_key: :group_id
  belongs_to :member, class_name: 'User', foreign_key: :member_id
end
