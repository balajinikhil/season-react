import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDetail from './seasonDetail'
import Spinner from './Spinner'

class App extends React.Component{
    state = {lat:null, errMessage:''}

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition((suc)=>{
            this.setState({lat:suc.coords.latitude})  
        },(err)=>{
            this.setState({errMessage:err.message})
        })
    }

    renderContent(){
        if(this.state.lat && !this.state.errMessage){
            return (
                <div>
                    <SeasonDetail lat={this.state.lat} />
                </div>
            )
        }

        if(this.state.errMessage && !this.state.lat ){
            return(
                <div>
                    <h1>Error: {this.state.errMessage}</h1>
                </div>
            )
        }

        return (
            <Spinner message="Please accept location request" />
        )



    }



    render(){

        return (
            <div>
              {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))