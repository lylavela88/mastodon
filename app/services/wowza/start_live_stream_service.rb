class Wowza::StartLiveStreamService
  def initialize(id)
    @id = id
  end

  def call
    wowza_client = WscSdk.client
    wowza_client.request_endpoint(:put, "live_streams/#{@id}/start")
  end
end