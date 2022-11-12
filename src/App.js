import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { publicRoutes } from '@/routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
