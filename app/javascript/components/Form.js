// DEPENDENCIES //
import React from 'react'

// COMPONENT CLASS //
class Form extends React.Component {
  // STATE //
  constructor() {
    super()
    this.state = {
      name: '',
      image: '',
      text: '',
      id: null
    }
  }
  // handlers //
  handleChange = (e) => {
    this.setState({[e.target.id] : e.target.value})
  }

  // handles submit
  handleSubmit = (e) => {
    // prevent default form submit action
    e.preventDefault()
    // if view is addMeme
    if(this.props.view.page === 'addMeme') {
      // create a meme
      this.props.handleCreate(this.state)
    } else if (this.props.view.page === 'editMeme') { // else if the view is editMeme
      // update the meme
      this.props.handleUpdate(this.state)
    }
  }
  // life cycles
  componentDidMount() {
    this.setState({
      name: this.props.formInputs.name,
      image: this.props.formInputs.image,
      text: this.props.formInputs.text,
      id: this.props.formInputs.id
    })
  }
  // render //
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputs">
          <label htmlFor="name">Name</label>
          <input type="text"
                 placeholder="your name"
                 id="name"
                 value={this.state.name}
                 onChange={this.handleChange}
                 />
        </div>
        <div className="inputs">
          <label htmlFor="image">Image</label>
          <input type="text"
                 placeholder="meme image"
                 id="image"
                 value={this.state.image}
                 onChange={this.handleChange}
                 />
        </div>

        <div className="inputs">
          <label htmlFor="text">Text</label>
          <input type="text"
                 placeholder="meme text"
                 id="text"
                 value={this.state.text}
                 onChange={this.handleChange}
                 />
        </div>

        <div className="inputs">
          <input className="submit" type="submit" value={this.props.view.page === 'addMeme' ? "Add Meme" : "Update Meme"}/>
        </div>
      </form>
    )
  }
}

// EXPORT
export default Form
