class Wowza::LiveStreamStateService
  def initialize(id)
    @id = id
  end

  def call
    wowza_client = WscSdk.client
    wowza_client.request_endpoint(:get, "live_streams/#{@id}/state")
  end
end
