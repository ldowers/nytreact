// Include React
import React from "react";

// Creating the Form component
export default class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            start: "",
            end: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Whenever we detect ANY change in the textbox, we register it.
    handleChange(event) {
        console.log("TEXT CHANGED");
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    // This code handles the sending of the search terms to the parent Search
    // component
    handleSubmit(event) {
        event.preventDefault();
        console.log("CLICKED");
        this
            .props
            .updateSearch(this.state.search, this.state.start, this.state.end);
    }

    // Here we render the Query component
    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i> Search Parameters</strong></h3>
                </div>
                <div className="panel-body">

                    {/* Note how we associate the text-box inputs with the state values */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <h4 className=""><strong>Topic</strong></h4>
                            <input
                                type="text"
                                value={this.state.search}
                                className="form-control"
                                id="search"
                                onChange={this.handleChange}
                                required/>

                            <h4><strong>Start Year</strong></h4>
                            <input
                                type="number"
                                value={this.state.start}
                                className="form-control"
                                id="start"
                                onChange={this.handleChange}
                                required/>

                            <h4><strong>End Year</strong></h4>
                            <input
                                type="number"
                                value={this.state.end}
                                className="form-control"
                                id="end"
                                onChange={this.handleChange}
                                required/>
                        </div>

                        {/* Here we create the onClick event that triggers the HandleSubmit */}
                        <br/>
                        <button className="btn btn-default" type="submit"><i className="fa fa-search"></i> Search</button>
                    </form>
                </div>
            </div>
        );
    }
};