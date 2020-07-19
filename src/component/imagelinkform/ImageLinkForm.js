import React, { Component } from 'react'
import './ImageLinkForm.css'

export class ImageLinkForm extends Component {
    render(){
        const {onInputChange,onSubmit} = this.props;
        return (
            <div>
                <p className="f3">
                    {'This Magic Brain will detect your face Automatically'}
                </p>
                <div className="center">
                    <div className=" form center pa4 br3 shadow-5">
                        <input className="f6 pa2 w-70 center" type="text" onChange={onInputChange}/>
                        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
                    </div>
                    
                </div>
            </div>
        )   
    }
}

export default ImageLinkForm