import React from 'react'
import './face.css'
class Face extends React.Component{
    render(){
        const {imageUrl,box}= this.props;
        if(!imageUrl){
            return null;
        }
        return(
            <div className="center ma">
                <div className="absolute mt2">
                    <img id = "inputimage" src={imageUrl} alt="face" width="500px" height="auto"/>
                    <div className="bounding_box" style={{top:box.topRow,right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
                </div>
            </div>
        )
    }
}
export default Face;