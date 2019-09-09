// DEPENDENCIES //
import React from 'react'

//components //
import Form from './Form.js'
import Post from './Post.js'

// COMPONENT CLASS //
class Main extends React.Component {
  // state //
  constructor(props) {
    super(props)
    this.state = {
      memes: [],
      image: ''
    }
  }
  // handlers //
  // fetches all the data
  fetchMemes = () => {
    fetch('api/memes')
      .then(data => data.json())
      .then(jData => {
        this.setState({ memes: jData })
      })
  }
  handleCreate = (createMeme) => {
    console.log(createMeme);
    fetch(`/api/memes`, {
      body: JSON.stringify(createMeme),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdMeme => {
        return createdMeme.json()
      })
      .then(jsonedMeme => {
        // take the user back to the index page
        this.props.handleView('home')
        // update state with our new meme
        this.setState(prevState => {
          prevState.memes.unshift(jsonedMeme)
          return {memes: prevState.memes}
        })
      })
      .catch(err => console.log(err))
  }

  handleUpdate = (updateMeme) => {
    fetch(`/api/memes/${updateMeme.id}`, {
      body: JSON.stringify(updateMeme),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedMeme => {
        //switch back to home after editing meme
        this.props.handleView('home')
        this.fetchMemes()
      })
      .catch(err => console.log(err))
  }

  handleDelete = (id) => {
    fetch(`/api/memes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(json => {
        this.setState(prevState => {
          const memes = prevState.memes.filter(meme => meme.id !== id)
          return { memes }
        })
      })
      .catch(err => console.log(err))
  }
  // life cycles //
  componentDidMount() {
  this.fetchMemes()
}
  // render //
  render () {
    return (
      <main>
        { this.props.view.page === 'home' ? this.state.memes.map ((memes) => (
          <div className="card-container" key={memes.id}>
            <Post memes={memes}
                  handleView={this.props.handleView}
                  handleDelete={this.handleDelete}
                  />
          </div>
        ))
        : <Form
              handleCreate={this.handleCreate}
              handleUpdate={this.handleUpdate}
              formInputs={this.props.formInputs}
              view={this.props.view}
              />
      }
      </main>
    )
  }
}

// EXPORT //
export default Main
