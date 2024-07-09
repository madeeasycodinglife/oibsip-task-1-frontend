// import { BrowserRouter } from 'react-router-dom';

// import React from 'react'
// import Navbar from './Pages/Navbar'
// import Home from './Pages/Home'
// import Search from './Pages/Search'
// // import Footer from './Pages/Footer'
// // import SignIn from './Components/SignIn'; // import your SignIn component
// // import SignUp from './Component/SignUp'; // import your SignUp component

// const App = () => {
//   return (
//     // <BrowserRouter>
//     <div>
//       <Navbar/>
//       <Home/>
//       <Search/>
//       <Footer/>
//     </div>
//     // </BrowserRouter>
//   )
// }

// export default App


// App.js

// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import React from 'react';
// import Navbar from './Components/Navbar';
// import Home from './Components/Home';
// import Search from './Components/Search';
// import Footer from './Components/Footer';
// import SignIn from './Components/SignIn';
// import SignUp from './Components/SignUp';

// const NestedContent = () => {
//   return (
//     <div>
//       <Navbar />
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/#search" component={Search} />
//         <Route path="/#Footer" component={Footer} />
//         {/* Add more routes as needed */}
//       </Switch>
//       <Footer />
//     </div>
//   );
// }
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* Route for sign-in */}
//         <Route path="/signin" component={SignIn} />

//         {/* Route for sign-up */}
//         <Route path="/signup" component={SignUp} />

//         {/* Default route for the main content */}
//         <Route path="/" component={NestedContent} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, {useContext} from 'react'
import  Layout from "./Components/Layout/Layout"
// import  AdminLayout from "./admin/Components/Layout/AdminLayout"
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);
  return(
    <AuthContextProvider>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
    </AuthContextProvider>
  ) 
}

export default App