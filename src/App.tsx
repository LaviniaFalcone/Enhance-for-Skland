import {useRoutes} from 'react-router-dom';
import routes from './routes';
import AppBar from './components/AppBar';

const App = () => {
    const router = useRoutes(routes);

    return (
        <div className='flex flex-column w-full h-screen align-items-center'>
            <AppBar/>
            <div className='flex flex-shrink-0 h-2rem bg-primary-900 w-full align-items-center justify-content-center'>
                <span
                    className='text-sm select-none'>查询结果可能与游戏内数据存在亿点延迟，具体请以游戏内数据为准。</span>
            </div>
            <div className='my-8 w-full' style={{maxWidth: 1000}}>{router}</div>
        </div>
    );
};

export default App;
