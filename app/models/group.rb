# == Schema Information
#
# Table name: groups
#
#  id                       :bigint(8)        not null, primary key
#  title                    :string           default(""), not null
#  description              :text             default(""), not null
#  category                 :string           default(""), not null
#  is_private               :boolean          default(FALSE)
#  cover_image_file_name    :string
#  cover_image_content_type :string
#  cover_image_file_size    :integer
#  cover_image_updated_at   :datetime
#  owner_id                 :bigint(8)
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

class Group < ApplicationRecord
  # include Attachmentable

  has_attached_file :cover_image

  belongs_to :owner, class_name: 'User'
  has_many :group_members, inverse_of: :group, dependent: :destroy
  has_many :members, through: :group_members

  validates :title, :description, :category, presence: true

  scope :only_public, -> { where(is_private: false ) }
end
