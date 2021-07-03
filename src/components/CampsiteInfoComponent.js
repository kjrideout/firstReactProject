import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, 
  BreadcrumbItem, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      touched: {
        rating: false,
        author: false,
        comment: false
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log('Current state is: ' + JSON.stringify(values));
    alert('Current state is: ' + JSON.stringify(values));
  }

  render() {
    return(
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label>Rating</Label>
                <Control.select model=".rating" name="rating"
                    className="form-control" id="rating">
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label>Your Name</Label>
                <Control.text model=".author" name="author"
                    className="form-control" id="author"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }}
                />
                <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                />
              </div>
              <div className="form-group">
                <Label>Rating</Label>
                <Control.textarea model=".comment" id="comment" 
                  name="comment" rows="6" className="form-control"
                />
              </div>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>

        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
      </React.Fragment>
    );
  }
}


function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comments => 
        <div key={comments.id}>
          <p>{comments.text}<br />
          --{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
        </div>)}
        <CommentForm />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
