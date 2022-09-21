# frozen_string_literal: true

class Api::V1::GroupMembersController < Api::BaseController
  before_action -> { doorkeeper_authorize! :read, :'read:group_members' }, only: [:index]
  before_action -> { doorkeeper_authorize! :write, :'write:group_members' }, except: [:index]

  before_action :require_user!
  before_action :find_group_member, only: [:destroy, :update]

  def index
    @group_members = @group.members
    render json: @group_members, serializer: REST::GroupMemberSerializer
  end

  def create
    @group_member = GroupMember.create!(group_member_params)
    render json: @group_member, serializer: REST::GroupMemberSerializer
  end

  def update
    @group_member = @group_member.update!(group_member_params)
    render json: @group_member, serializer: REST::GroupMemberSerializer
  end

  def destroy
    @group_member.destroy!
    render_empty
  end

  private

  def group_member_params
    params.permit(:id, :group_id, :member_id, :status, :can_post)
  end

  def find_group_member
    @group_member = GroupMember.find_by(id: group_member_params[:id])
  end
end
    