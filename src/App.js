import './App.css';
import router from './router/index';
import {RouterProvider} from "react-router-dom"

function App() {
    return (
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
