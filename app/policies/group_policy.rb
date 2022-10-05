# frozen_string_literal: true

class GroupPolicy < ApplicationPolicy
  def create?
    admin?
  end

  def show?
    (@record.owner_id == current_user.id) || (@record.member_ids.include? current_user.id)
  end
end
