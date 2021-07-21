module Webhooks
  class WowzaController < ApplicationController
    protect_from_forgery except: :hook

    def hook
      if params[:event] == "audio.stopped"
        wowza_client = WscSdk.client
        wowza_client.request_endpoint(:put, "live_streams/#{params[:object_id]}/stop")    
      end
    end
  end
end