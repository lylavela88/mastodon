# frozen_string_literal: true

class Api::V1::GroupsController < Api::BaseController
  before_action -> { doorkeeper_authorize! :read, :'read:groups' }, only: [:index, :search]
  before_action :require_user!

  def index
    @groups = current_user.admin? ? Group.where(owner: current_user) : Group.joins(:members).where('group_members.member_id = ?', current_user.id)
    render json: @groups, each_serializer: REST::GroupSerializer
  end

  def create
    @group = Group.create!(group_params.merge(owner: current_user))
    render json: @group, serializer: REST::GroupSerializer
  end

  def search
    @groups = Group.only_public.where("title ILIKE :search OR category ILIKE :search", search: "%#{params[:search]}%")
    render json: @groups, serializer: REST::GroupSerializer
  end

  private
  
  def group_params
    params.permit(:title, :description, :category, :is_private, cover_image: [])
  end
end
