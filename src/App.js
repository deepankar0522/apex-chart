import './App.css';
import UserStatsChart from './UserStatsChart';

function App() {
  return (
    <div className="App">
       <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
     <UserStatsChart/>
    </div>
  );
}

export default App;
