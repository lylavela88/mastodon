import React from 'react';
import { connect, useSelector } from 'react-redux';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import StatusListContainer from '../../ui/containers/status_list_container';
import { updateAllStatuses } from '../../../actions/statuses';
import Column from '../../../components/column';
import ColumnHeader from '../../../components/column_header';
import { expandGroupByIdTimeline } from '../../../actions/timelines';
import { addColumn, removeColumn, moveColumn } from '../../../actions/columns';
import ColumnSettingsContainer from '../containers/column_settings_container';
import { connectPublicStream } from '../../../actions/streaming';

const messages = defineMessages({
  title: { id: 'column.public', defaultMessage: 'Exploration timeline' },
});

const mapStateToProps = (state, { onlyMedia, columnId }) => {
  const uuid = columnId;
  state.set('statuses',[])
  const columns = state.getIn(['settings', 'columns']);
  const index = columns.findIndex(c => c.get('uuid') === uuid);

  return {
    hasUnread: state.getIn(['timelines', `public${onlyMedia ? ':media' : ''}`, 'unread']) > 0,
    onlyMedia: (columnId && index >= 0) ? columns.get(index).getIn(['params', 'other', 'onlyMedia']) : state.getIn(['settings', 'public', 'other', 'onlyMedia']),
  };
};

export default @connect(mapStateToProps)
@injectIntl
class GroupTimeline extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static defaultProps = {
    onlyMedia: false,
  };

  static propTypes = {
    title: PropTypes.string,
    group_id: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    shouldUpdateScroll: PropTypes.func,
    intl: PropTypes.object.isRequired,
    columnId: PropTypes.string,
    multiColumn: PropTypes.bool,
    hasUnread: PropTypes.bool,
    onlyMedia: PropTypes.bool,
  };

  handlePin = () => {
    const { columnId, dispatch, onlyMedia } = this.props;

    if (columnId) {
      dispatch(removeColumn(columnId));
    } else {
      dispatch(addColumn('PUBLIC', { other: { onlyMedia } }));
    }
  }

  handleMove = (dir) => {
    const { columnId, dispatch } = this.props;
    dispatch(moveColumn(columnId, dir));
  }

  handleHeaderClick = () => {
    this.column.scrollTop();
  }

  componentDidMount () {
    const { dispatch, onlyMedia } = this.props;
    dispatch(expandGroupByIdTimeline({ onlyMedia, group_id: this.props.group_id }));
    this.disconnect = dispatch(connectPublicStream({ onlyMedia }));
    this.props.dispatch(updateAllStatuses());
  }

  componentDidUpdate (prevProps) {
    if (prevProps.onlyMedia !== this.props.onlyMedia) {
      const { dispatch, onlyMedia } = this.props;

      this.disconnect();
      dispatch(expandGroupByIdTimeline({ onlyMedia, group_id: this.props.group_id }));
      this.disconnect = dispatch(connectPublicStream({ onlyMedia }));
    }
  }

  componentWillUnmount () {
    if (this.disconnect) {
      this.disconnect();
      this.disconnect = null;
    }
  }

  setRef = c => {
    this.column = c;
  }

  handleLoadMore = maxId => {
    const { dispatch, onlyMedia } = this.props;
    dispatch(expandGroupByIdTimeline({ maxId, onlyMedia, group_id: this.props.group_id }));
  }

  render () {
    const { intl, shouldUpdateScroll, columnId, hasUnread, multiColumn, onlyMedia, id, title } = this.props;
    const pinned = !!columnId;

    return (
      <Column ref={this.setRef} label={title ||  intl.formatMessage(messages.title)}>
        <ColumnHeader
          icon='globe'
          active={hasUnread}
          title={title ||  intl.formatMessage(messages.title)}
          onPin={this.handlePin}
          onMove={this.handleMove}
          onClick={this.handleHeaderClick}
          pinned={pinned}
          multiColumn={multiColumn}
        >
        </ColumnHeader>

        <StatusListContainer
          timelineId={`group${this.props.group_id}`}
          onLoadMore={this.handleLoadMore}
          trackScroll={!pinned}
          group_id={this.props.group_id}
          scrollKey={`public_timeline-${columnId}`}
          emptyMessage={<FormattedMessage id='empty_column.public' defaultMessage='There is nothing here! Write something publicly, or manually follow users from other servers to fill it up' />}
          shouldUpdateScroll={shouldUpdateScroll}
        />
      </Column>
    );
  }

}
