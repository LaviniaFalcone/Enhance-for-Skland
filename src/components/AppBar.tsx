import {Logout, Peoples} from '@icon-park/react';
import {observer} from 'mobx-react-lite';
import {Avatar} from 'primereact/avatar';
import {Button} from 'primereact/button';
import {Divider} from 'primereact/divider';
import {Menu} from 'primereact/menu';
import {Tag} from 'primereact/tag';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import userStore from '../store/userStore';
import {removeSessionStorage} from '../util/storage';

const AppBar = () => {
    const navigate = useNavigate();
    const menu = useRef<Menu>(null);

    const logout = () => {
        removeSessionStorage('CurrentLogin');
        userStore.user = undefined;
        navigate('/');
    };

    const options = [
        {label: '切换角色', icon: <Peoples className='mr-2'/>, command: () => navigate('/binding')},
        {separator: true},
        {label: '退出登录', icon: <Logout className='mr-2'/>, command: logout}
    ];

    return (
        <div className='w-full'>
            <div className='flex align-items-center h-4rem px-3 gap-3 surface-card select-none'>
                <div className='flex align-items-center gap-1'>
                    <div className='flex flex-column'>
                        <div className='text-xs font-italic'>Enhance for</div>
                        <div className='text-2xl' style={{lineHeight: '1.75rem'}}>Skland.</div>
                    </div>
                    <Tag severity='info'>Beta</Tag>
                </div>
                <div className='flex-grow-1'/>
                {
                    userStore.user &&
                    <Button className='surface-0' onClick={e => menu.current?.toggle(e)} text>
                        <div className='flex align-items-center gap-2'>
                            <div className='flex border-circle overflow-hidden'>
                                <Avatar image={userStore.user.user.avatar}/>
                            </div>
                            <div>{userStore.user.user.nickname}</div>
                        </div>
                    </Button>
                }
                <Menu ref={menu} className='mt-3' model={options} popup/>
            </div>
            <Divider className='m-0'/>
        </div>
    );
};

export default observer(AppBar);