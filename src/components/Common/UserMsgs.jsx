import React from "react";

export class UserMsgs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: ""
        };
        this.textLog = React.createRef();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight; // Auto-scrolls to the bottom
    }

    handleOnChange(event) {
        this.setState({
            userMessage: event.target.value
        })
    }

    render() {
        return (
            <textarea style={{ display: 'none' }} className="user-msgs" ref={this.textLog} cols="125" rows="15" value={this.state.userMessage} onChange={(event) => this.handleOnChange(event)} />
        );
    }
}