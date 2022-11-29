import { Fragment } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './App.css';
import { publicRoutes, privateRoutes } from '@/routes';
import config from './config';

import DefaultLayout from './layouts/DefaultLayout';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const accessToken = Cookies.get('accessToken');
                    const refreshToken = Cookies.get('refreshToken');
                    const user = localStorage.getItem('user');
                    const path = config.routes.login;
                    if (!accessToken || !refreshToken || !user) {
                        return <Route key={index} path={route.path} element={<Navigate to={path} replace />} />;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
