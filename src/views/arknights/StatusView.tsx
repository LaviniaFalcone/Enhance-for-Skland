import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMountEffect} from 'primereact/hooks';
import {queryArknightsRole} from '../../skland-api/fn';
import PersonalModule from '../../components/arknights/PersonalModule';
import PlayerAssistCharCard from '../../components/arknights/AssistCharModule';
import PublicRecruitmentModule from '../../components/arknights/PublicRecruitmentModule';
import InfrastructureModule from '../../components/arknights/InfrastructureModule';
import {LocalUser} from '../../location';
import {readSessionStorage} from '../../util/storage';
import userStore from '../../store/userStore';

const StatusView = () => {
    const navigate = useNavigate();
    const {state: {uid, channel}} = useLocation();

    const [character, setCharacter] = useState<ArknightsPlayer>();

    useMountEffect(() => {
        const current = readSessionStorage<LocalUser>('CurrentLogin');
        if (current) {
            userStore.setUser(current.user);
            queryArknightsRole(current.cred, uid).then(r => setCharacter(r));
        } else {
            navigate('/');
        }
    });

    const body = () => {
        if (!character) return <div>Loading</div>;

        return (
            <div className='flex flex-column gap-2'>
                <div className='grid'>
                    <div className='flex flex-column col-8 gap-3'>
                        <PersonalModule character={character} channel={channel}/>
                        <PublicRecruitmentModule character={character}/>
                    </div>
                    <div className='flex flex-column col-4 gap-3'>
                        <PlayerAssistCharCard character={character}/>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col-12'>
                        <InfrastructureModule character={character}/>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col-12'>
                        <div className='flex flex-column surface-card border-round-xl'>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (<div className='flex flex-column gap-4'>{body()}</div>);
};

export default StatusView;