class Wowza::CreateLiveStreamService
  def initialize(params)
    @title = params[:title]
    @vod = params[:vod].to_i
  end

  def call
    wowza_client = WscSdk.client
    response = wowza_client.request_endpoint(:post, "live_streams", data)

    Wowza::SetTranscoderPropertyService.new(response["live_stream"]["id"]).call if !@vod.zero?
    Wowza::StartLiveStreamService.new(response["live_stream"]["id"]).call
    
    response["live_stream"].extract!(
      "id",
      "player_hls_playback_url", 
      "source_connection_information"
    )
  end
  
  def data
      {
        "live_stream": {
          "aspect_ratio_height": 1080,
          "aspect_ratio_width": 1920,
          "billing_mode": "pay_as_you_go",
          "broadcast_location": "asia_pacific_india",
          "encoder": "other_webrtc",
          "name": @title,
          "playback_stream_name": @title,
          "transcoder_type": "transcoded",
          "closed_caption_type": "none",
          "delivery_method": "push",
          "delivery_protocols": [
            "webrtc"
          ],
          "delivery_type": "single-bitrate",
          "disable_authentication": true,
          "low_latency": false,
          "player_countdown": true,
          "player_countdown_at": "2020-02-01T17:00:00.000Z",
          "player_logo_position": "top-right",
          "player_responsive": false,
          "player_type": "original_html5",
          "player_width": 640,
          "recording": true,
          "hosted_page": true,
          "remove_hosted_page_logo_image": true,
          "remove_player_logo_image": true,
          "remove_player_video_poster_image": true,
          "target_delivery_protocol": "hls-https",
          "use_stream_source": false,
          "vod_stream": !@vod.zero?
        }
      }
  end  
end