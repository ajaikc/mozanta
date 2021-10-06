import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import Tutorial from "./tutorial.component";
import TutorialsList from "./tutorials-list.component";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You Added successfully!</h4>
            <h5>if more data click Add button</h5>
            <FontAwesomeIcon icon={faPlusCircle} size="2rem" onClick={this.newTutorial}></FontAwesomeIcon>
        
          </div>
        ) : (
          <div>
            <div className="form-group">
            <h4>Tasks</h4>
              <div className="taskInput">
            
               
              <FontAwesomeIcon icon={faPlus}  onClick={this.saveTutorial} ></FontAwesomeIcon>
            
              <input
                type="text"
                className="inputField"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                placeholder="Add a Task"
              />
            </div>
            </div>
            
              <TutorialsList/>
          </div>
        )}
      </div>
    );
  }
}
