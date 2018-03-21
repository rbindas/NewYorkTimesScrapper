import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Panel from "../../components/Panel";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import SaveBtn from "../../components/SaveBtn";

class Home extends Component {
    state = {
        articles: [],
        queryTopic: "",
       
    };


    getArticles = () => {
        let query = `${this.state.queryTopic}`;
        if (this.state.startDate) {
            query = `${query}&begin_date=${this.state.startDate}`;
        }
        if (this.state.endDate) {
            query = `${query}&end_date=${this.state.endDate}`;
        }
        API.nytSearch(query)
            .then(res => {
                console.log(res);
                this.setState({
                    articles: res.data.response.docs,
                    queryTopic: '',
                    startDate: '',
                    endDate: ''
                });
            })
            .catch(err => console.log(err));
    };

    saveArticle = articleData => {
        API.saveArticle(articleData)
            .then(res => {
                console.log("article saved!");
            })
             .catch(err => {
                console.log(err);
      })
  }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.queryTopic) {
            this.getArticles();
        }
    };

render() {
    return (
        <div> 
        <Row>
            <Col size = "md-12" >
            <Panel>
              <h2> Search </h2>
            </Panel>
            <form>            
              <Input value = { this.state.queryTopic } 
              onChange = { this.handleInputChange } 
              name = "queryTopic"
              placeholder = "Topic (required)"/>
              
              <Input value = { this.state.startDate } 
              onChange = { this.handleInputChange } 
              name = "startDate"
              placeholder = "Start Year (Optional)"/>
              
              <Input value = { this.state.endDate } 
              onChange = { this.handleInputChange } 
              name = "endDate"
              placeholder = "End Year (Optional)"/>
            
              <FormBtn disabled = {!(this.state.queryTopic) } 
                onClick = {this.handleFormSubmit}>Search
              </FormBtn>
            </form>
            </Col>
        </Row>

        <Row>
            <Col size = "md-12 sm-12">
                <Panel>
                <h2>Search Results</h2>
                </Panel> 
              {this.state.articles.length ? ( 
                <List> 
                  {this.state.articles.map(article => ( 
                    <ListItem key = { article._id }>
                      <a href = { article.web_url } target = "_blank">
                      <strong>{ article.headline.main }</strong></a>
                      <br/>
                      <span>Published on { article.pub_date }</span> 
                        <SaveBtn style = {{float: "right"}} 
                        onClick = {() => this.saveArticle({
                                    title: article.headline.main,
                                    url: article.web_url,
                                    date: article.pub_date
                                })} />
                         
                    </ListItem>
                        ))} 
                </List>
                    ) : ( 
                    <h3 > No Results to Display </h3>
                )} 
            </Col>            
        </Row>

        </div>
        );
    }
    }

export default Home;