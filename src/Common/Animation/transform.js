import React from 'react';
import { Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

class Scale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
        };
    }

    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.setState({ visible: true });
        }
        Animated.timing(this._visibility, {
            toValue: nextProps.visible ? 1 : 0,
            duration: 500,
        }).start(() => {
            this.setState({ visible: nextProps.visible });
        });
    }

    render() {
        const { style, children, ...rest } = this.props;

        const containerStyle = {
            transform: [
                {
                    translateY: this._visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, 1],
                    }),
                },
            ],
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
                {this.state.visible ? children : null}
            </Animated.View>
        );
    }
}

Scale.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    children: PropTypes.node,
    visible: PropTypes.bool,
};

export default Scale;