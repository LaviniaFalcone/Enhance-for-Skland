import {Avatar} from 'primereact/avatar';
import {Divider} from 'primereact/divider';
import {Image} from 'primereact/image';
import React, {Fragment} from 'react';
import {Player} from '../../skland-api/arknights';
import {getAvatarUrl, getSkinAvatarUrl} from '../../skland-api/arknights/character';
import ExperimentOptions from '../../store/arknights/config/ExperimentOptions';
import {DatetimeFormat, datetimeFormat} from '../../util/time';
import MiniProgressBar from '../MiniProgressBar';

interface PersonalModuleProps {
    model: Player;
    channel: number;
}

const PersonalModule = ({model, channel}: PersonalModuleProps) => {
    const {building, campaign, chars, charInfoMap, routine, status, skins, tower} = model;

    const getPlayerAp = () => {
        const correctAp = status.ap.max - Math.ceil((status.ap.completeRecoveryTime - Date.now() / 1000) / 360);
        return Math.max(status.ap.current, correctAp);
    };

    const playerAp = ExperimentOptions.ApCorrect ? getPlayerAp() : status.ap.current;

    const playerAccountInfo = (
        <>
            <div className='flex surface-d border-round-lg overflow-hidden'>
                <Avatar image={(status.avatar.type == 'ICON' ? getAvatarUrl : getSkinAvatarUrl)(status.avatar.id)}
                        size='large'/>
            </div>
            <div className='flex flex-column gap-1'>
                <div className='flex align-items-center gap-2'>
                    <div className='text-xl'>{status.name}</div>
                    {
                        channel == 2 &&
                        <Image className='w-1rem' width='100%'
                               src='https://www.bilibili.com/favicon.ico'/>
                    }
                </div>
                <div className='flex text-xs gap-2'>
                    <div className='bg-primary-900 border-round tag select-none text-white'>Lv.{status.level}</div>
                    <div className='surface-d border-round tag'>UID:{status.uid}</div>
                </div>
            </div>
        </>
    );

    const playerApInfo = (
        <>
            <div className='text-xs text-600 select-none'>理智</div>
            <div className='flex-grow-1'/>
            <div className='flex align-items-baseline gap-1'>
                <div className='text-xl text-primary'>{playerAp > status.ap.max ? status.ap.max : playerAp}</div>
                <div className='text-xs text-600'>/</div>
                <div className='text-xs text-600'>{status.ap.max}</div>
            </div>
            <MiniProgressBar value={playerAp / status.ap.max * 100}/>
        </>
    );

    const playerRegisterInfo = (
        <>
            <div className='flex text-xs text-600 select-none'>
                <div>入职时间</div>
                <div className='flex-grow-1'/>
                <div>已苏醒 {Math.ceil((Date.now() / 1000 - status.registerTs) / 86400)} 天</div>
            </div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>
                {
                    datetimeFormat(status.registerTs, {
                        format: DatetimeFormat.ShortYearNoSecondsDatetime,
                        sec: true
                    })
                }
            </div>
        </>
    );

    const playerProgressInfo = (
        <>
            <div className='text-xs text-600 select-none'>作战进度</div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>{status.mainStageProgress || '全部完成'}</div>
        </>
    );

    const playerSecretaryInfo = (
        <>
            <div className='text-xs text-600 select-none'>助理干员</div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>{charInfoMap[status.secretary.charId].name}</div>
        </>
    );

    const playerFurnitureCountInfo = (
        <>
            <div className='flex text-xs text-600 select-none'>家具保有量</div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>{building.furniture.total}</div>
        </>
    );

    const playerCharCountInfo = (
        <>
            <div className='text-xs text-600 select-none'>干员招募数</div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>
                {chars.find(char => char.charId === 'char_1001_amiya2') ? chars.length - 1 : chars.length}
            </div>
        </>
    );

    const playerSkinCountInfo = (
        <>
            <div className='text-xs text-600 select-none'>时装拥有数</div>
            <div className='flex-grow-1'/>
            <div className='text-xl text-primary'>{skins.length}</div>
        </>
    );

    const playerMissionInfo = (
        <div className='flex flex-grow-1 -m-2'>
            <div className='flex flex-column col'>
                <div className='text-xs text-600 select-none'>日常周常</div>
                <div className='flex-grow-1'/>
                <div className='flex gap-2'>
                    <div className='flex flex-grow-1 align-items-baseline'>
                        <div className='text-lg text-primary'>{routine.daily.current}</div>
                        <div className='text-xs text-600'>/{routine.daily.total}</div>
                    </div>
                    <div className='flex flex-grow-1 align-items-baseline'>
                        <div className='text-lg text-primary'>{routine.weekly.current}</div>
                        <div className='text-xs text-600'>/{routine.weekly.total}</div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MiniProgressBar className='flex-grow-1' value={routine.daily.current / routine.daily.total * 100}/>
                    <MiniProgressBar className='flex-grow-1'
                                     value={routine.weekly.current / routine.weekly.total * 100}/>
                </div>
            </div>
        </div>
    );

    const playerTowerInfo = (
        <div className='flex flex-grow-1 -m-2'>
            <div className='flex flex-column col'>
                <div className='text-xs text-600 select-none'>保全派驻</div>
                <div className='flex-grow-1'/>
                <div className='flex gap-2'>
                    <div className='flex flex-grow-1 align-items-baseline'>
                        <div className='text-lg text-purple-300'>{tower.reward.lowerItem.current}</div>
                        <div className='text-xs text-600'>/{tower.reward.lowerItem.total}</div>
                    </div>
                    <div className='flex flex-grow-1 align-items-baseline'>
                        <div className='text-lg' style={{color: 'gold'}}>{tower.reward.higherItem.current}</div>
                        <div className='text-xs text-600'>/{tower.reward.higherItem.total}</div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <MiniProgressBar className='flex-grow-1' color='var(--purple-300)'
                                     value={tower.reward.lowerItem.current / tower.reward.lowerItem.total * 100}/>
                    <MiniProgressBar className='flex-grow-1' color='gold'
                                     value={tower.reward.higherItem.current / tower.reward.higherItem.total * 100}/>
                </div>
            </div>
        </div>
    );

    const playerCampaignInfo = (
        <div className='flex flex-grow-1 -m-2'>
            <div className='flex flex-column col'>
                <div className='text-xs text-600 select-none'>剿灭作战</div>
                <div className='flex-grow-1'/>
                <div className='flex align-items-baseline text-xl'>
                    <div className='text-lg text-red-500'>{campaign.reward.current}</div>
                    <div className='text-xs text-600'>/</div>
                    <div className='text-xs text-600'>{campaign.reward.total}</div>
                </div>
                <div className='flex gap-1'>
                    <MiniProgressBar className='flex-grow-1' color='var(--red-500)'
                                     value={campaign.reward.current / campaign.reward.total * 100}/>
                </div>
            </div>
        </div>
    );

    const horizontalGrid = (...data: React.ReactNode[]) => (
        <div className='flex h-4rem'>
            {<div className='flex flex-column col h-full'>{data.shift()}</div>}
            {
                data.map((item, index) => (
                    <Fragment key={index}>
                        <Divider className='m-0' layout='vertical'/>
                        <div className='flex flex-column col h-full'>{item}</div>
                    </Fragment>
                ))
            }
        </div>
    );

    return (
        <div className='flex flex-column surface-card border-round-xl shadow-2'>
            <div className='flex h-4rem'>
                <div className='flex align-items-center flex-shrink-0 w-8 gap-2 p-2'>{playerAccountInfo}</div>
                <Divider className='m-0' layout='vertical'/>
                <div className='flex flex-column flex-shrink-0 col h-full'>{playerApInfo}</div>
            </div>
            <Divider className='m-0'/>
            {horizontalGrid(playerRegisterInfo, playerProgressInfo, playerSecretaryInfo)}
            <Divider className='m-0'/>
            {
                horizontalGrid(
                    playerFurnitureCountInfo,
                    playerCharCountInfo,
                    playerSkinCountInfo,
                    playerMissionInfo,
                    playerTowerInfo,
                    playerCampaignInfo
                )
            }
        </div>
    );
};

export default PersonalModule;