import React, { Component } from "react";
import { connect } from "react-redux";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "@material-ui/icons/Add";
import { Grid, Row } from "react-flexbox-grid";
import _ from "lodash";
import * as actions from "./../actions";
import Notepad from "./Notepad";
import uuid from 'uuid/v4';

class Home extends Component {
  state = {
    notesData: [
      {
        id: 0,
        title: "",
        content: ""
      }
    ]
  };

  componentDidMount() {
    if (localStorage && localStorage.getItem("notezy"))
      this.setState({ notesData: JSON.parse(localStorage.getItem("notezy")) });
  }

  componentDidUpdate() {
    localStorage.setItem("notezy", JSON.stringify(this.state.notesData));
  }

  updateNote = noteDataReceived => {
    let { notesData } = this.state;
    console.log("Received in props:");
    var noteData = noteDataReceived;
    var index = _.findIndex(notesData, { id: noteData.id });
    console.log(index);
    // Replace item at index using native splice
    notesData.splice(index, 1, noteData);
    this.setState({ notesData: notesData });
  };
  removeNote = id => {
    let index = _.findIndex(this.state.notesData, { id });
    this.setState(prevState => {
      prevState.notesData.splice(index, 1);
      return {
        notesData: prevState.notesData
      }
    })
    // console.log(this.state);
  }
  handleAddNotepad = event => {
    console.log("Length:" + this.state.notesData.length);
    let newNoteData = {
      id: uuid(),
      title: "",
      content: ""
    };    

    this.setState({ notesData: this.state.notesData.concat([newNoteData]) });
  };
  render() {
    const styles = {
      floatingButton: {
        marginRight: "20px",
        position: "fixed",
        right: "20px",
        bottom: "20px"
      }
    };
    return (
      <div className="home-wrap">
        <h1 style={{ textAlign: "center" }}>Notezy&nbsp;📒</h1>
        <Grid fluid>
          <Row>
            {this.state.notesData.map(noteData => {
              return (
                <Notepad
                  key={noteData.id}
                  noteData={JSON.stringify(noteData)}
                  updateNote={this.updateNote}
                  remove={() => this.removeNote(noteData.id)}
                />
              );
            })}
          </Row>
        </Grid>
        <FloatingActionButton
          style={styles.floatingButton}
          onClick={this.handleAddNotepad}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  actions
)(Home);
