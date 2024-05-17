import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateProject, ManageProject } from './Pages';
import SideBar from './CommonComponents/SideBar';

function App() {
  return (
    <div class="wrapper d-flex align-items-stretch">
            <Router>
      <SideBar/>
      <Routes>
        <Route path="/" element={<CreateProject />} />
        <Route path="/Manage-Project" element={<ManageProject />} />
      </Routes>


    </Router >

            
        </div>
    
  );
}

export default App;
