# frozen_string_literal: true

class REST::GroupSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :is_private, :cover_image

  def id
    object.id.to_s
  end
end
