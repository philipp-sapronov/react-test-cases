import React, { useEffect } from 'react';
import { useHistory, BrowserRouter, Route } from 'react-router-dom';

const Page = ({ onMount, onUnmount, shouldRedirect }) => {
  const history = useHistory();

  if (shouldRedirect) history.push('/404');

  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  return <div>page</div>;
};

const ErrorPage = () => {
  return <div>404</div>;
};

export const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/" key="/" exact>
        <Page {...props} />
      </Route>
      <Route path="/404" key="/404" exact>
        <ErrorPage />
      </Route>
    </BrowserRouter>
  );
};
