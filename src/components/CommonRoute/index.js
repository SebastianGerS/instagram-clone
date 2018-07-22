import React from 'react';
import './styles.css';
import { Header, Footer } from '../';
import {Route} from 'react-router-dom';

const CommonRoute =( {component: Component, ...rest}) => (
  

    <Route {...rest} render={props => 
        (
            <div className="app">
                <Header />
                <div className="wraper">
                    <Component {...props}/>
                </div>
                <Footer/>
            </div>
        )
    }/>
)

export default CommonRoute;
