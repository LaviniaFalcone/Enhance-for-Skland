import React from 'react';
import {Divider} from 'primereact/divider';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';

interface SklandBindListProps {
    value: SklandBinding;
}

const SklandBindList = ({value}: SklandBindListProps) => {
    const navigate = useNavigate();

    const go = (uid: string | number, channel: number) => {
        navigate(`/${value.appCode}/info`, {state: {uid, channel}});
    };

    return (
        <div className='flex flex-column surface-card shadow-2 border-round-2xl'>
            <div className='flex align-items-baseline select-none gap-2 p-3'>
                <div className='text-2xl'>{value.appName}</div>
                <div className='text-sm'>查询到 {value.bindingList.length} 个角色</div>
            </div>
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-3'>
                {
                    value.bindingList.map((role, index) => (
                        <div className='flex align-items-center surface-0 border-round-lg gap-2 p-2' key={index}>
                            <div className='text-xs surface-d border-round select-none tag'>
                                {role.channelName.toUpperCase()}
                            </div>
                            <div>{role.nickName}</div>
                            <div className='text-xs surface-d border-round select-none tag'>UID: {role.uid}</div>
                            {
                                role.isDefault &&
                                <div className='text-xs bg-primary-900 border-round select-none tag'>默认角色</div>
                            }
                            <div className='flex-grow-1'/>
                            <Button className='w-2rem h-2rem' icon='pi pi-sign-in' outlined
                                    onClick={() => go(role.uid, role.channelMasterId)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SklandBindList;