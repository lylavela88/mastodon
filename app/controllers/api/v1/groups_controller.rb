# frozen_string_literal: true

class Api::V1::GroupsController < Api::BaseController
  include Authorization

  before_action -> { doorkeeper_authorize! :read, :'read:groups' }, only: [:index, :search]
  before_action :require_user!
  before_action :find_group, only: [:show]

  def index
    user_id = current_user.id.to_s
    sql = "Select groups.*, gm.is_admin as admin, gm.id as joined from groups left join group_members gm on groups.id = gm.group_id and gm.member_id = "+ user_id+" where is_private = false or owner_id = " + user_id
    puts sql;
    @groups = ActiveRecord::Base.connection.execute(sql)
    # if (params[:member] != 'true')
    # @groups =  Group.where('is_private = false or owner_id = :user_id', user_id: current_user.id).joins(:members).where('group_members.member_id = ?', current_user.id)    #.joins("LEFT JOIN group_members ON group_members.group_id = groups.id").where("(group_members.status = 1 and group_members.member_id = :user_id) or (group_members.member_id != :user_id) ",user_id:current_user.id)
    # else 
    # @groups = Group.joins(:members).where('is_private = false and group_members.member_id != ?', current_user.id)
    # end
    render json: @groups, each_serializer: REST::GroupSerializer
  end

  def create
    authorize :group, :create?
    @group = Group.create!(group_params.merge(owner: current_user))
    GroupMember.create!(group_id: @group.id, member_id: current_user.id, status:1, can_post: true, is_admin:1)
    render json: @group, serializer: REST::GroupSerializer
  end

  def show
    render json: @group, each_serializer: REST::GroupSerializer
  end

  def search
    @groups = Group.only_public.where("title ILIKE :search OR category ILIKE :search", search: "%#{params[:search]}%")
    render json: @groups, each_serializer: REST::GroupSerializer
  end

  private
  
  def group_params
    params.permit(:title, :description, :category, :is_private, cover_image: [])
  end

  def find_group
   # @group = Group.find(params[:id])
   user_id = current_user.id.to_s

    sql = "Select groups.*, gm.is_admin as admin, gm.id as joined from groups left join group_members gm on groups.id = gm.group_id and gm.member_id = "+ user_id+" where groups.id = "+params[:id]
    puts sql;
    @group_ = ActiveRecord::Base.connection.execute(sql)
    @group = @group_[0]
  end
end
