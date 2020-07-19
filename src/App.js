import React from 'react';
import Particles from 'react-particles-js'
import './App.css';
import Navigation from './component/navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/imagelinkform/ImageLinkForm';
import Face from './component/face/Face';
import Rank from './component/Rank/Rank';
import Clarifai from 'clarifai';
import SignIn from './component/signIn/SignIn';
import Register from './component/register/Register';


const app = new Clarifai.App({
  apiKey:'736d95e2484d4411a5d30634f84c9c09'
})

const particleOption={
  particles:{
    number:{
      value:50,
      density:{
        enable:true,
        value_area:600
      }
    }
  }
}

class App extends React.Component{
  state={
    input:'',
    imageUrl:'',
    box:{},
    route:'signin',
    isSignedIn:false
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace  = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol :width - (clarifaiFace.right_col* width),
      bottomRow :height - (clarifaiFace.bottom_row*height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({
      box:box
    })
  }
  onInputChange =(e)=>{
    this.setState({
      input:e.target.value
    })
  }
  onSubmit=()=>{
    this.setState({
      imageUrl:this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=>{
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(error=>{
      console.log(error);
    })
  }
  onRouteChange=(route)=>{
    if(route === 'signout'){
      this.setState({
        isSignedIn:false
      })
    }else if(route === 'home'){
      this.setState({
        isSignedIn :true
      })
    }
    this.setState({
      route:route
    })
  }
  render(){
    console.log(this.state.box);
    return(
      <div className="App">
        <Particles 
          className="particles"
          params={particleOption}
        />
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn = {this.state.isSignedIn}
        />
        {this.state.route === 'home'? 
          <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <Face
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
          
          :(
            this.state.route === 'signin'?
            <SignIn onRouteChange={this.onRouteChange}/>
            :
            <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }  
}

export default App;
