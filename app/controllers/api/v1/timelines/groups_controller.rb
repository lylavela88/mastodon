# frozen_string_literal: true

class Api::V1::Timelines::GroupsController < Api::BaseController
  before_action -> { doorkeeper_authorize! :read, :'read:statuses' }, only: [:show]
  before_action :require_user!, only: [:show]
  after_action :insert_pagination_headers, unless: -> { @statuses.empty? }

  respond_to :json

  def show
    @statuses = load_statuses

    render json: @statuses,
           each_serializer: REST::StatusSerializer,
           relationships: StatusRelationshipsPresenter.new(@statuses, current_user&.account_id),
           status: 200
  end

  private

  def load_statuses
    cached_groups_statuses
  end

  def cached_groups_statuses
    cache_collection groups_statuses, Status
  end

  def groups_statuses
    account_group_feed.get(
      limit_param(DEFAULT_STATUSES_LIMIT),
      params[:max_id],
      params[:since_id],
      params[:min_id]
    )
  end

  def account_group_feed
    grp_ids = Group.where(owner_id: current_user&.id).ids
    GroupFeed.new(grp_ids)
  end

  def insert_pagination_headers
    set_pagination_headers(next_path, prev_path)
  end

  def pagination_params(core_params)
    params.slice(:local, :limit).permit(:local, :limit).merge(core_params)
  end

  def next_path
    api_v1_timelines_groups_url pagination_params(max_id: pagination_max_id)
  end

  def prev_path
    api_v1_timelines_groups_url pagination_params(min_id: pagination_since_id)
  end

  def pagination_max_id
    @statuses.last.id
  end

  def pagination_since_id
    @statuses.first.id
  end
end
