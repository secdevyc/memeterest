// DEPENDENCIES //
import React from 'react'

// COMPONENT CLASS //
class Post extends React.Component {
  //RENDER//
  render () {
    return (
      <div className="card" key={this.props.memes.id}>
        <h2> {this.props.memes.text}</h2>
        <img src={this.props.memes.image} alt="" />
        <h4>posted by: {this.props.memes.name}</h4>
        <div className="options">
          <h5 onClick={() => {this.props.handleView('editMeme', this.props.memes)}}>edit</h5>
          <h5 onClick={() => {this.props.handleDelete(this.props.memes.id)}}>delete</h5>
        </div>
      </div>
    )
  }
}

// EXPORT //
export default Post
