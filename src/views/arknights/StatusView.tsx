import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMountEffect} from 'primereact/hooks';
import {queryArknightsRole} from '../../skland-api/arknights/user';
import PersonalModule from '../../components/arknights/PersonalModule';
import AssistCharacterModule from '../../components/arknights/AssistCharModule';
import PublicRecruitmentModule from '../../components/arknights/PublicRecruitmentModule';
import InfrastructureModule from '../../components/arknights/InfrastructureModule';
import {LocalUser} from '../../location';
import {readSessionStorage} from '../../util/storage';
import {Player} from '../../skland-api/arknights';
import userStore from '../../store/userStore';

const StatusView = () => {
    const navigate = useNavigate();
    const {state: {uid, channel}} = useLocation();

    const [player, setPlayer] = useState<Player>();

    useMountEffect(() => {
        const current = readSessionStorage<LocalUser>('CurrentLogin');
        if (current) {
            userStore.user = current.user;
            queryArknightsRole(current.cred, uid).then(r => setPlayer(r));
        } else {
            navigate('/');
        }
    });

    const body = () => {
        if (!player) return <div>Loading</div>;

        return (
            <div className='flex flex-column gap-2'>
                <div className='grid'>
                    <div className='flex flex-column col-8 gap-3'>
                        <PersonalModule model={player} channel={channel}/>
                        <PublicRecruitmentModule model={player}/>
                    </div>
                    <div className='flex flex-column col-4 gap-3'>
                        <AssistCharacterModule model={player}/>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col-12'>
                        <InfrastructureModule model={player}/>
                    </div>
                </div>
            </div>
        );
    };

    return (<div className='flex flex-column gap-4'>{body()}</div>);
};

export default StatusView;