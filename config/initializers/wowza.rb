require 'wsc_sdk'

WscSdk.configure do |config|
  config.api_key      = ENV['WOWZA_API_KEY']
  config.access_key   = ENV['WOWZA_ACCESS_KEY']
  config.logger       = ::Logger.new(STDOUT)
  config.version      = "v1.6"
end