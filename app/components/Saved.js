// Include React
import React from "react";

// This is the Saved component. It will be used to show a log of  recent
// searches.
export default class Saved extends React.Component {
   constructor(props) {
        super(props);

        this.renderArticles = this.renderArticles.bind(this);
    }

    renderEmpty() {
        console.log ("renderEmpty");
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title"><strong><i className="fa fa-table"></i> Saved Articles</strong></h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        No Articles Saved
                    </ul>
                </div>
            </div>
        );
    }

    // A helper method for mapping through our articles and outputting some HTML
    renderArticles() {
            console.log ("renderArticles: " + this.props.savedArticles[0]);

            return this.props.savedArticles.map(function(article, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <h3>
                                <span>
                                    <em>{article.title}</em>
                                </span>
                                <span className="btn-group pull-right">
                                    <a href={article.url} rel="noopener noreferrer" target="_blank">
                                        <button className="btn btn-default ">View Article</button>
                                    </a>
                                    <button className="btn btn-primary" onClick={() => this.props.deleteArticle(article)}>Delete</button>
                                </span>
                            </h3>
                            <p>Date Published: {article.date}</p>
                        </li>
                    </div>
                );
            }.bind(this));
    }

    // A helper method for rendering a container and all of our artiles inside
    renderContainer() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title"><strong><i className="fa fa-table"></i> Saved Articles</strong></h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {this.renderArticles()}
                    </ul>
                </div>
            </div>
        );
    }

    // Here we describe this component's render method
    render() {
        if (!this.props.savedArticles[0]) {
            return this.renderEmpty();
        }

        return this.renderContainer();
    }
};