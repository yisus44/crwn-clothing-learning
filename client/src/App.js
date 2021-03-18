import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component.jsx";

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.action";

import { createStructuredSelector } from "reselect";

const HomePage = lazy(() => import("./pages/homepage/homepage.component.jsx"));
const ShopPage = lazy(() => import("./pages/shop/shop.component.jsx"));
const CheckoutPage = lazy(() =>
  import("./pages/checkout/checkout.component.jsx")
);
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx")
);

import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={HomePage}></Route>

            <Route path="/shop" component={ShopPage}></Route>
            <Route exact path="/checkout" component={CheckoutPage}></Route>
            <Route
              exact
              path="/login"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            ></Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return { checkUserSession: () => dispatch(checkUserSession()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
