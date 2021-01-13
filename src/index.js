import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './containers/homepage';
class App extends React.Component{
    componentDidMount() {
        fetch('/api')
          .then(res => res.json())
          .then(data => console.log('data',data));
      }

    render(){
        return(
            <Homepage></Homepage>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)