import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { get } from '../reducers/rootReducer';

class StatusBar extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div className="status_bar">
                <FontAwesomeIcon
                    icon={this.props.isLoading ? faSpinner : faCheck}
                    pulse={this.props.isLoading ? true : false}
                />
                <span className="message">{this.props.isLoading ? "Loading..." : "Ready"}</span>
            </div>
        );
    }
}

export default connect(state => ({
    isLoading: get.isLoading(state)
}))(StatusBar);