import React, {useEffect, useRef, useState} from 'react';
import {Divider} from 'primereact/divider';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Avatar} from 'primereact/avatar';
import {AxiosError} from 'axios';
import {Toast} from 'primereact/toast';
import {useNavigate} from 'react-router-dom';
import {useMountEffect} from 'primereact/hooks';
import {Tag} from 'primereact/tag';
import {LocalUser} from '../location';
import {readLocalStorage, removeLocalStorage, writeLocalStorage, writeSessionStorage} from '../util/storage';
import {InputTextarea} from 'primereact/inputtextarea';
import userStore from '../store/userStore';
import {queryUser} from '../skland-api/user';

const SklandCredLoginView = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const [cred, setCred] = useState<string>('');
    const [checking, setChecking] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const [user, setUser] = useState<SklandUser>();
    const [lastLogin, setLastLogin] = useState<LocalUser>();

    const checkCred = async () => {
        if (cred.length !== 32) return;
        setChecking(true);
        setUser(undefined);
        try {
            setUser(await queryUser(cred));
        } catch (e) {
            const error = e as AxiosError;
            console.log(error);
            switch (error.code) {
                case 'ERR_NETWORK':
                    toast.current?.show({severity: 'error', summary: error.code, detail: '网络异常'});
                    break;
                case 'ERR_BAD_REQUEST':
                    toast.current?.show({severity: 'error', summary: error.code, detail: '无效凭据'});
                    break;
            }
        } finally {
            setChecking(false);
        }
    };

    const login = async (cred: string, user: SklandUser) => {
        writeLocalStorage('LastLogin', {cred, user});
        writeSessionStorage('CurrentLogin', {cred, user});
        userStore.user = user;
        navigate('/binding');
    };

    const clearLogin = () => {
        removeLocalStorage('LastLogin');
        setLastLogin(undefined);
    };

    useEffect(() => {
        setDisabled(cred.length !== 32);
    }, [cred]);

    useMountEffect(() => {
        setLastLogin(readLocalStorage<LocalUser>('LastLogin'));
    });

    const command1 = 'localStorage.getItem("SK_OAUTH_CRED_KEY");';
    const command2 = 'javascript:prompt(undefined, localStorage.getItem("SK_OAUTH_CRED_KEY"));';

    const help = (
        <>
            <div className='flex flex-column surface-0 border-round-lg gap-2 p-2'>
                <Tag severity='success'>方法一</Tag>
                <div className='flex align-items-center gap-1'>
                    <div>1. 打开</div>
                    <Button className='px-1 py-0' icon='pi pi-link' label='森空岛网页版' text
                            onClick={() => open('https://www.skland.com/')}/>
                    <div>并登录。</div>
                </div>
                <div className='flex align-items-center gap-1'>
                    <div>2. 打开网页开发工具并切换到</div>
                    <Tag>应用程序</Tag>
                    <div>选项卡</div>
                </div>
                <div className='flex align-items-center gap-1'>
                    <div>3. 选择</div>
                    <Tag>存储 {'->'} 本地存储 {'->'} https://www.skland.com</Tag>
                </div>
                <div className='flex align-items-center gap-1'>
                    <div>4. 右侧面板中</div>
                    <Tag>SK_OAUTH_CRED_KEY</Tag>
                    <div>的值就是您的凭据。</div>
                </div>
                <Tag severity='success'>方法二</Tag>
                <div className='flex align-items-center gap-1'>
                    <div>1. 打开</div>
                    <Button className='px-1 py-0' icon='pi pi-link' label='森空岛网页版' text
                            onClick={() => open('https://www.skland.com/')}/>
                    <div>并登录。</div>
                </div>
                <div className='flex align-items-center gap-1'>
                    <div>2. 打开网页开发工具并切换到</div>
                    <Tag>控制台</Tag>
                    <div>选项卡</div>
                </div>
                <div className='flex flex-column gap-1'>
                    <div>3. 在控制台中输入以下内容并回车：</div>
                    <InputTextarea value={command1} autoResize readOnly/>
                </div>
                <div className='flex'>4. 控制台返回的值就是您的凭据。</div>
                <Tag severity='success'>方法三</Tag>
                <div className='flex align-items-center gap-1'>
                    <div>1. 打开</div>
                    <Button className='px-1 py-0' icon='pi pi-link' label='森空岛网页版' text
                            onClick={() => open('https://www.skland.com/')}/>
                    <div>并登录。</div>
                </div>
                <div className='flex flex-column gap-1'>
                    <div>2. 在浏览器地址栏中输入以下内容并回车：</div>
                    <InputTextarea value={command2} autoResize readOnly/>
                </div>
                <div className='flex'>3. 浏览器弹出的对话框内的值就是您的凭据。</div>
                <Tag severity='warning'>请妥善保管您的凭据，切勿透露给他人！</Tag>
            </div>
        </>
    );

    return (
        <div className='flex flex-column surface-card border-round-xl'>
            <Toast ref={toast} position='bottom-right'/>
            <div className='flex align-items-baseline gap-2 p-3 select-none'>
                <div className='text-xl'>凭据</div>
                <div className='text-sm'>CREDENTIALS</div>
            </div>
            <Divider className='m-0'/>
            <div className='flex'>
                <div className='flex flex-column flex-shrink-0 w-6 gap-2 p-3 select-none'>
                    {
                        !user &&
                        <>
                            <div className='text-sm'>输入凭据</div>
                            <div className='p-inputgroup'>
                                <InputText value={cred} onChange={e => setCred(e.target.value)} keyfilter={/\w/}
                                           type='password' maxLength={32} readOnly={checking}/>
                                <Button icon='pi pi-arrow-right' loading={checking} onClick={checkCred}
                                        disabled={disabled}/>
                            </div>
                        </>
                    }
                    {
                        user &&
                        <>
                            <div className='text-sm'>确认账户</div>
                            <div className='flex align-items-center surface-0 border-round-lg gap-2 p-2'>
                                <div className='flex surface-d border-round-lg overflow-hidden'>
                                    <Avatar image={user.user.avatar}/>
                                </div>
                                <div className='text-lg'>{user.user.nickname}</div>
                                <div className='flex-grow-1'/>
                                <Button className='w-2rem h-2rem' severity='success' icon='pi pi-sign-in'
                                        onClick={() => login(cred, user)}/>
                            </div>
                            <div className='flex justify-content-end'>
                                <Button className='text-xs p-0' severity='danger' label='返回上一步' text
                                        onClick={() => setUser(undefined)}/>
                            </div>
                        </>
                    }
                    {
                        lastLogin &&
                        <>
                            <div className='text-sm'>上次登录</div>
                            <div className='flex align-items-center surface-0 border-round-lg gap-2 p-2'>
                                <div className='flex surface-d border-round-lg overflow-hidden'>
                                    <Avatar image={lastLogin.user.user.avatar}/>
                                </div>
                                <div className='text-lg'>{lastLogin.user.user.nickname}</div>
                                <div className='flex-grow-1'/>
                                <Button className='w-2rem h-2rem' severity='success' icon='pi pi-sign-in'
                                        onClick={() => login(lastLogin.cred, lastLogin.user)}/>
                            </div>
                            <div className='flex justify-content-end'>
                                <Button className='text-xs p-0' severity='danger' label='清除登录记录' text
                                        onClick={clearLogin}/>
                            </div>
                        </>
                    }
                </div>
                <Divider className='m-0' layout='vertical'/>
                <div className='flex flex-column w-6 gap-2 p-3 select-none'>
                    <div className='text-sm'>如何获取凭据</div>
                    {help}
                </div>
            </div>
        </div>
    );
};

export default SklandCredLoginView;