// DEPENDENCIES //
import React from 'react'
//components
import Header from './Header.js'
import Main from './Main.js'

// COMPONENT CLASS //
class App extends React.Component {
  //  STATE //
  constructor(props) {
    super(props)
    this.state = {
      view: {
        page: 'home',
        pageTitle: 'All Memes'
      },
      formInputs: {
        name: null,
        image: null,
        text: null,
        id: null
      }
    }
  }
  // HANDLERS //
  // handles the view state
  handleView = (view, memes) => {
    // declare an empty variable
    let pageTitle = ''
    let formInputs = {
      name: '',
      image: '',
      text: '',
      id: null
    }
    // decide the pageTitle based on the VIEW
    switch (view) {
      case 'home':
        pageTitle = 'All Memes'
        break
      case 'addMeme':
        pageTitle = 'Add Meme'
        break
      case 'editMeme':
        pageTitle = 'Edit Meme'
        formInputs = {
          name: memes.name,
          image: memes.image,
          text: memes.text,
          id: memes.id
        }
        break
      default:
        break
    }
    // update the STATE
    this.setState({
      view: {
        page: view,
        pageTitle: pageTitle
      },
      formInputs: formInputs
    })
  }
  // RENDER //
  render () {
    return (
      <div>
        <Header handleView={this.handleView}/>
        <Main view={this.state.view}
              handleView={this.handleView}
              formInputs={this.state.formInputs}
        />
      </div>
    )
  }
}


// EXPORT //
export default App
