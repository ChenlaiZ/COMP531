import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { uploadArticle } from './articleActions'

class NewArticle extends Component {

    handleImageChange(e) {
        e.preventDefault()

        let reader = new window.FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        if (typeof(this.file) == 'Blob')
            reader.readAsDataURL(this.file)
    }

    render() { return (
        <tr>
            <td>
                <p>
                    <div className="card">
                        <div>
                            <p>Say something...</p>
                            <p><textarea className="postarea"
                              placeholder="Add your post here..."
                              value={ this.message }
                              onChange={(e) => {
                                this.message = e.target.value
                                this.forceUpdate();
                            }}></textarea></p>
                        </div>
                        <div>
                            <p>Add a picture</p>
                            <input type="file" id="articleImage" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
                            { !this.file && !this.message ? '' :
                                <div>
                                    <input className="cardbutton" type="button" value="Publish it"
                                        onClick={() => {
                                            this.props.dispatch(uploadArticle(this.message, this.file))
                                            this.message = ''
                                            this.file = undefined
                                            this.forceUpdate()
                                        }}/>
                                </div>
                            }
                        </div>
                        { !this.file ? '' :
                            <div>
                                <img className="postImage" src={this.preview}/>
                                <div>
                                { this.file.webkitRelativePath || this.file.name }<br/>
                                ({ parseInt(this.file.size / 1024 * 100)/100.0 } kB)
                                </div>
                            </div>
                        }
                    </div>
                </p> 
            </td>
        </tr>
    )}
}

export default connect()(NewArticle)



/** WEBPACK FOOTER **
 ** ./src/components/article/newArticle.js
 **/