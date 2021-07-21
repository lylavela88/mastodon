class LiveStreamMailer < ApplicationMailer
  add_template_helper RoutingHelper

  def registration(data, account)
    recipients = ['messenjahofchrist@gmail.com', 'sinobach@gmail.com']
    @data = data.except(:account_id)
    @account = account
    
    mail to: recipients, subject: I18n.t('live_stream_mailer.registration.subject')
  end

  def approved(data)
    recipients = ['messenjahofchrist@gmail.com', 'sinobach@gmail.com']
    @data = data

    mail to: recipients, subject: I18n.t('live_stream_mailer.approved.subject')
  end
end