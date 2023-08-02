import React, {useRef} from 'react';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import {observer} from 'mobx-react-lite';
import userStore from '../store/userStore';
import {Menu} from 'primereact/menu';
import {Button} from 'primereact/button';
import {removeSessionStorage} from '../util/storage';
import {Tag} from 'primereact/tag';
import {useNavigate} from 'react-router-dom';

const AppBar = () => {
    const navigate = useNavigate();
    const menu = useRef<Menu>(null);

    const logout = () => {
        removeSessionStorage('CurrentLogin');
        userStore.user = undefined;
        navigate('/');
    };

    const options = [
        {label: '切换角色', icon: 'pi pi-users', command: () => navigate('/binding')},
        {separator: true},
        {label: '退出登录', icon: 'pi pi-sign-out', command: logout}
    ];

    return (
        <div className='sticky top-0 w-full z-5'>
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
                <Menu ref={menu} className='mt-2' model={options} popup/>
            </div>
            <Divider className='m-0'/>
        </div>
    );
};

export default observer(AppBar);