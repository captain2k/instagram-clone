import Header from "./Components/Header";
import { Navigate, Route, Routes } from 'react-router'
import routes from "./routes";
import './App.css'
import { useSelector } from "react-redux";
import Profile from "./Components/Profile";

function App() {

  const userStore = useSelector(state => state.userReducer)

  const showRoutes = () => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element()}
        />
      )
    })
  }

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <Header />
      </div>
      {/* Contents */}
      <div className="content">
        <div className="container">
          <div className="row">
            <Routes>
              {showRoutes()}
              <Route path='/:userName/*' element={userStore.isOnline ? <Profile /> : <Navigate to='/' />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
