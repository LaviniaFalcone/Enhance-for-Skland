import {useRoutes} from 'react-router-dom';
import routes from './routes';
import AppBar from './components/AppBar';
import {ScrollPanel} from 'primereact/scrollpanel';

const App = () => {
    const router = useRoutes(routes);

    return (
        <div className='flex flex-column w-full h-screen align-items-center'>
            <div className='w-full shadow-2 z-5'>
                <AppBar/>
            </div>
            <ScrollPanel className='w-full' style={{height: 'calc(100vh - 4rem)'}}>
                <div className='flex h-full center'>
                    <div className='py-8 w-full h-full' style={{maxWidth: 1000}}>{router}</div>
                </div>
            </ScrollPanel>
        </div>
    );
};

export default App;
