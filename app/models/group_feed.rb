# frozen_string_literal: true

class GroupFeed < Feed
  def initialize(group_ids)
    @type    = :group
    @ids     = group_ids
  end

  def get(limit, max_id = nil, since_id = nil, min_id = nil)
    from_database(limit, max_id, since_id, min_id)
  end

  private

  def from_database(limit, max_id, since_id, min_id)
    Status.as_group_timeline(@ids)
          .paginate_by_id(limit, max_id: max_id, since_id: since_id, min_id: min_id)
  end
end