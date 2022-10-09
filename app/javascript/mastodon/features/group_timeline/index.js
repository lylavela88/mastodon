import React from 'react';
import { connect } from 'react-redux';
import { expandTimeline } from '../../actions/timelines';
import { updateAllStatuses } from '../../actions/statuses';
import PropTypes from 'prop-types';
import StatusListContainer from '../ui/containers/status_list_container';
import Column from '../../components/column';
import ColumnHeader from '../../components/column_header';
import { addColumn, removeColumn, moveColumn } from '../../actions/columns';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import ColumnSettingsContainer from './containers/column_settings_container';
import { Link } from 'react-router-dom';
import GroupList from '../group_list'

const messages = defineMessages({
  title: { id: 'column.groups', defaultMessage: 'Groups' },
  createGroupTitle: { id: 'column.create_groups', defaultMessage: 'Create Groups' },
});

const mapStateToProps = state => ({
  hasUnread: state.getIn(['timelines', 'groups', 'unread']) > 0,
  isPartial: state.getIn(['timelines', 'groups', 'isPartial']),
});

export default @connect(mapStateToProps)
@injectIntl
class GroupTimeline extends React.PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    shouldUpdateScroll: PropTypes.func,
    intl: PropTypes.object.isRequired,
    hasUnread: PropTypes.bool,
    isPartial: PropTypes.bool,
    columnId: PropTypes.string,
    multiColumn: PropTypes.bool,
  };

  handlePin = () => {
    const { columnId, dispatch } = this.props;

    if (columnId) {
      dispatch(removeColumn(columnId));
    } else {
      dispatch(addColumn('GROUP', {}));
    }
  }

  handleMove = (dir) => {
    const { columnId, dispatch } = this.props;
    dispatch(moveColumn(columnId, dir));
  }

  handleHeaderClick = () => {
    this.column.scrollTop();
  }

  setRef = c => {
    this.column = c;
  }

  handleLoadMore = maxId => {
    this.props.dispatch(expandTimeline({ maxId }));
  }

  componentDidMount() {
    this._checkIfReloadNeeded(false, this.props.isPartial);
    this.props.dispatch(updateAllStatuses());
  }

  componentDidUpdate(prevProps) {
    this._checkIfReloadNeeded(prevProps.isPartial, this.props.isPartial);
  }

  componentWillUnmount() {
    this._stopPolling();
  }

  _checkIfReloadNeeded(wasPartial, isPartial) {
    const { dispatch } = this.props;
    if (wasPartial === isPartial) {
      return;
    } else if (!wasPartial && isPartial) {
      this.polling = setInterval(() => {
        dispatch(expandTimeline());
      }, 3000);
    } else if (wasPartial && !isPartial) {
      this._stopPolling();
    }
  }

  _stopPolling() {
    if (this.polling) {
      clearInterval(this.polling);
      this.polling = null;
    }
  }

  render() {
    const { intl, shouldUpdateScroll, hasUnread, columnId, multiColumn } = this.props;
    const pinned = !!columnId;

    return (
      <Column ref={this.setRef} label={intl.formatMessage(messages.title)}>
        <ColumnHeader
          icon='users'
          active={hasUnread}
          title={intl.formatMessage(messages.title)}
          onPin={this.handlePin}
          onMove={this.handleMove}
          onClick={this.handleHeaderClick}
          pinned={pinned}
          multiColumn={multiColumn}
          createGroupBtn={true}
          createGroupTitle={intl.formatMessage(messages.createGroupTitle)}

        >

          <ColumnSettingsContainer />
        </ColumnHeader>

        <GroupList myGroup={true}/>
        <StatusListContainer
          trackScroll={!pinned}
          scrollKey={`group_timeline-${columnId}`}
          onLoadMore={this.handleLoadMore}
          timelineId='group'
          emptyMessage={<FormattedMessage id='empty_column.home' defaultMessage='The group timeline is empty. Write something into groups to get the ball rolling!' />}
          shouldUpdateScroll={shouldUpdateScroll}
        />
      </Column>
    );
  }

}
