import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component {
    // set initial state for new instance of app
    state = {
        lat: null,
        errorMessage: ''
    };

    componentDidMount() {
        // Get coordinates from browser geolocation
        // Update state object with this.setState
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message})
        );
    }
    componentDidUpdate() {
        console.log('My component was just updated - it rerendered!');
    }
    //helper to check what content to render
    renderContent () {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }
        return <Loader message="Please accept location request"/>;
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
)