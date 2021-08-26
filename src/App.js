import './App.css';
import LoginForm from './LoginForm';
import CompanyRegisterForm from './CompanyRegisterForm';
import CompanyTable from './CompanyTable';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
  
  const [cookie, setCookie] = useState('');
  
  useEffect(() => {
    setCookie(Cookies.get('token'));
  }, []);
  // const cookie = getCookie('token');

  return (
    <div className="App">
      <BrowserRouter>      
        <Suspense fallback=''>
          <Switch>
            <Route
              path='/company'
              render={({ match : { url } }) => {
                if (cookie) {
                  return <>
                    <Route exact path={`${url}`} component={CompanyTable} />
                    <Route exact path={`${url}/create`} component={CompanyRegisterForm} />
                  </>
                } else {
                  return <Route exact path={`${url}`} component={LoginForm} />
                }
              }}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
