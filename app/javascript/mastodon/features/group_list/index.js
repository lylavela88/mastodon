import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoadingIndicator from '../../components/loading_indicator';
import Column from '../ui/components/column';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';
import { fetchGroups } from '../../actions/groups';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ColumnLink from '../ui/components/column_link';
import ColumnSubheading from '../ui/components/column_subheading';
import NewGroupForm from './components/new_group_form';
import { createSelector } from 'reselect';
import ScrollableList from '../../components/scrollable_list';

const messages = defineMessages({
  heading: { id: 'column.groups', defaultMessage: 'New Group' },
  subheading: { id: 'groups.subheading', defaultMessage: 'Your Groups' },
});

const getGroups = createSelector([state => state.get('groups')], groups => {

  if (!groups) {
    return [];
  }
  return groups.toList().filter(item => !!item).sort((a, b) => a.get('title').localeCompare(b.get('title')));
});

const getSuggestedGroups = createSelector([state => state.get('suggestedgroups')], suggestedgroups => {
  if (!suggestedgroups) {
    return [];
  }
  return suggestedgroups;
});

const mapStateToProps = state => {
  return ({
  groups: getGroups(state),
  suggestedGroups: getSuggestedGroups(state)
})};

export default @connect(mapStateToProps)
@injectIntl
class GroupList extends ImmutablePureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  componentWillMount() {

    this.props.dispatch(fetchGroups(this.props.myGroup));
  }

  render() {
    const { intl, shouldUpdateScroll, groups, myGroup, suggestedGroups } = this.props;

    const emptyMessage = <FormattedMessage id='empty_column.groups' defaultMessage="You don't have any groups yet." />;


    return (
      <>
        <ScrollableList
          scrollKey={'groups' + myGroup}
          shouldUpdateScroll={shouldUpdateScroll}
          emptyMessage={emptyMessage}
          prepend={<ColumnSubheading text={myGroup ? intl.formatMessage(messages.subheading) : "Suggested Group"} />}
        >
          {myGroup ? (
            groups.map(group =>
              <ColumnLink join={group.get('join')} is_private={group.get('is_private')} is_admin={group.get('admin')} key={group.get('id')} to={`/timelines/group/${group.get('id')}`} icon='list-ul' text={group.get('title')} />
            )
          ) : (
            suggestedGroups.map(group =>
              <ColumnLink key={group.get('id')} to={`/timelines/group/${group.get('id')}`} icon='list-ul' text={group.get('title')} />
            )
          )}
        </ScrollableList>

      </>
    );
  }

}
