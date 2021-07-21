class Api::V1::LiveStreamsController < Api::BaseController
  include Authorization

  before_action -> { doorkeeper_authorize! :write, :'write:statuses' }, only: [:create]
  before_action :require_user!

  respond_to :json

  def registration
    @account = Account.find(params[:account_id])

    LiveStreamMailer.registration(params[:live_stream], @account).deliver_now
  end

  def create
    wowza_response = Wowza::CreateLiveStreamService.new(live_stream_params).call
    
    @status = PostStatusService.new.call(current_user.account,
      text: "#{live_stream_params[:title]} #{wowza_response["player_hls_playback_url"]}",
      thread: nil,
      sensitive: live_stream_params[:sensitive],
      visibility: live_stream_params[:visibility],
      application: doorkeeper_token.application,
      idempotency: request.headers['Idempotency-Key'])
    
    render json: wowza_response
  end

  private
  def live_stream_params
    params.permit(
      :title,
      :sensitive,
      :visibility,
      :vod
    )
  end
end