import api from '../api';
import { CancelToken, isCancel } from 'axios';
import { throttle } from 'lodash';

export function submitLiveStreamRegistrationForm(data) {
  return function (dispatch, getState) {
    api(getState).post('/api/v1/live_streams/registration', {
      ...data,
    }).then(function (response) {
      console.log("success", response)
    }).catch(function (error) {
      console.log("failed", error)
    });
  };
};

export function goLive(title, vod, props) {
  return function (dispatch, getState) {
    if ((!title || !title.length)) {
      return;
    }

    api(getState).post('/api/v1/live_streams', {
      title,
      vod,
      sensitive: getState().getIn(['compose', 'sensitive']),
      visibility: getState().getIn(['compose', 'privacy']),
    }, {
      headers: {
        'Idempotency-Key': getState().getIn(['compose', 'idempotencyKey']),
      },
    }).then(function (response) {
      const source_connection_information = response.data.source_connection_information
      props.onClose();
      openPublishPage(source_connection_information)
    }).catch(function (error) {
      console.log("failed", error)
    });
  };
};

function openPublishPage(source_connection_information) {
  const applicationName = source_connection_information.application_name
  const sdpURL = source_connection_information.sdp_url
  const streamName = source_connection_information.stream_name
  const publishUrl = `https://www.wowza.com/webrtc/publish?applicationName=${applicationName}&sdpURL=${sdpURL}&streamName=${streamName}`
  
  window.open(publishUrl, "_blank")
}
