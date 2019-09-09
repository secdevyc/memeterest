// DEPENDENCIES //
import React from 'react'

// COMPONENT CLASS //
class Header extends React.Component {
  render(){
    return(
      <div>
        <header>
          <div className="header-inner-container">
            <h1>MEMETEREST</h1>
            <div className="nav">
              <h4 onClick={() => {this.props.handleView('home')}}>HOME</h4>
              <h4 onClick={() => {this.props.handleView('addMeme')}}>ADD MEME</h4>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

// EXPORT //
export default Header
