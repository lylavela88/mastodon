# frozen_string_literal: true

class GroupInvitesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_group_member_by_token

  def accept
    @group_member&.confirmed!
    redirect_to root_path
  end

  private

  def find_group_member_by_token
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
    member_id = crypt.decrypt_and_verify(params[:id])

    @group_member = GroupMember.find_by(id: member_id)
  end
end
