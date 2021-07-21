class Wowza::SetTranscoderPropertyService
  def initialize(id)
    @id = id
  end

  def call
    wowza_client = WscSdk.client
    
    wowza_client.request_endpoint(:post, "transcoders/#{@id}/properties", data)
  end

  def data
    {
      property: {
        key: "live2vod",
        section: "vod_stream",
        value: true
      } 
    }
  end  
end