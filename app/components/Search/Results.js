// Include React
import React from "react";

// Include our helpers for API calls
var helpers = require("../../utils/helpers");

// Creating the Results component
export default class Results extends React.Component {
   constructor(props) {
        super(props);

        this.state = {
            title: "",
            url: "",
            pubdate: ""
        };
        
        this.renderArticles = this.renderArticles.bind(this);
    }

  // This code handles the sending of the search terms to the parent Search component
  handleClick(item) {
    console.log("CLICKED");
    console.log(item);

    helpers.postSaved(item.headline.main, item.pub_date, item.web_url).then(function() {
      console.log(item.web_url);
    });
  }

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles() {
    return this.props.results.docs.map(function(article, index) {

      // Each article thus reperesents a list group item with a known index
      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.headline.main}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.web_url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Article</button>
                </a>

                {/*
                  By using an arrow function callback to wrap this.handleClick,
                  we can pass in an article as an argument
                */}
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Save</button>
              </span>
            </h3>
            <p>Date Published: {article.pub_date}</p>

          </li>

        </div>
      );

    }.bind(this));

  }

  // A helper method for rendering a container to hold all of our articles
  renderContainer() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
        </div>
        <div className="panel-body">
            <ul className="list-group">
                {this.renderArticles()}
            </ul>
        </div>
      </div>
    );
  }

  render() {
    // If we have no articles, render this HTML
    if (!this.props.results.docs) {
      return (
        <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
        </div>
        <div className="panel-body">
            <ul className="list-group">
                Enter Search to see Articles
            </ul>
        </div>
      </div>
      );
    }
    // If we have articles, return this.renderContainer() which in turn, returns all the articles
    return this.renderContainer();
  }
};