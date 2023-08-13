import {Refresh, Setting} from '@icon-park/react';
import {Button} from 'primereact/button';
import {useMountEffect} from 'primereact/hooks';
import {Toolbar} from 'primereact/toolbar';
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AssistCharacterModule from '../../components/arknights/AssistCharModule';
import InfrastructureModule from '../../components/arknights/InfrastructureModule';
import PersonalModule from '../../components/arknights/PersonalModule';
import PublicRecruitmentModule from '../../components/arknights/PublicRecruitmentModule';
import SettingDialog from '../../components/arknights/SettingDialog';
import {LocalUser} from '../../location';
import {Player} from '../../skland-api/arknights';
import {queryArknightsRole} from '../../skland-api/arknights/user';
import userStore from '../../store/userStore';
import {readSessionStorage} from '../../util/storage';

const StatusView = () => {
    const navigate = useNavigate();
    const {state: {uid, channel}} = useLocation();

    const [player, setPlayer] = useState<Player>();
    const [showSetting, setShowSetting] = useState<boolean>(false);

    useMountEffect(() => {
        const current = readSessionStorage<LocalUser>('CurrentLogin');
        if (current) {
            userStore.user = current.user;
            queryArknightsRole(current.cred, uid).then(r => setPlayer(r));
        } else {
            navigate('/');
        }
    });

    const toolTip = (
        <div className='flex text-sm surface-card border-round-xl center select-none'>
            查询结果可能与游戏内数据存在亿点延迟，具体请以游戏内数据为准。
        </div>
    );

    const buttons = (
        <div className='flex gap-2'>
            <Button className='w-2rem h-2rem' icon={<Refresh/>} onClick={() => location.reload()} outlined/>
            <Button className='w-2rem h-2rem' icon={<Setting/>} onClick={() => setShowSetting(true)} outlined/>
        </div>
    );

    const body = () => {
        if (!player) return <div className='flex flex-grow-1 center'>Loading</div>;

        return (
            <div className='flex flex-column gap-2'>
                <div className='grid'>
                    <div className='col-12'>
                        <Toolbar className='border-round-xl shadow-2' start={toolTip} end={buttons}/>
                    </div>
                </div>
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

    return (
        <>
            <div className='flex flex-column gap-4'>{body()}</div>
            <SettingDialog header='设置' onHide={() => setShowSetting(false)} visible={showSetting}/>
        </>
    );
};

export default StatusView;