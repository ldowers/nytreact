// Include React
import React from "react";

// Here we include all of the sub-components
import Query from "./Search/Query";
import Results from "./Search/Results";
import Saved from "./Saved";

// Helper for making Axios requests to our API
import helpers  from "../utils/helpers";

const jumbotronStyle = {
  color: 'white',
  backgroundColor: '#20315A'
};

// Creating the Main component
export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          results: {},
          savedArticles: {}
        };

        this.setQuery = this.setQuery.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
  
  setQuery(newQuery, newStart, newEnd) {
    helpers.runQuery(newQuery, newStart, newEnd).then(function(data) {
      this.setState({ results: { docs: data.docs } });
    }.bind(this));
  }

  // When this component mounts, get all saved articles from our db
  componentDidMount() {
    helpers.getSaved().then(function(articleData) {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this));
  }

// This code handles the deleting saved articles from our database
  handleClick(item) {
    console.log("CLICKED");
    console.log(item);

    // Delete the list!
    helpers.deleteSaved(item.title, item.date, item.url).then(function() {

      // Get the revised list!
      helpers.getSaved().then(function(articleData) {
        this.setState({ savedArticles: articleData.data });
        console.log("saved results", articleData.data);
      }.bind(this));

    }.bind(this));
  }

  // Here we render the function
  render() {
    return (
      <div className="container">
        <div className="jumbotron" style={jumbotronStyle}>
          <h1 className="text-center">
            <strong>
              <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
          </h1>
          <p className="text-center">
            <em>Search for and annotate articles of interest!</em>
          </p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Query updateSearch={this.setQuery}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Results results={this.state.results}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Saved savedArticles={this.state.savedArticles} deleteArticle={this.handleClick}/>
          </div>
        </div>
      </div>
    );
  }
};