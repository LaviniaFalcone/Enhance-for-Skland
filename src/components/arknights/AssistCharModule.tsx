import React from 'react';
import {Image} from 'primereact/image';
import {
    getEquipTypeIconUrl,
    getEquipTypeShiningUrl,
    getSkillIconUrl,
    getSkinAvatarUrl
} from '../../skland-api/arknights/character';
import {Divider} from 'primereact/divider';
import {Avatar} from 'primereact/avatar';
import MiniProgressBar from '../MiniProgressBar';

import Evolve0 from '../../assets/arknights/img/icon_evolve_0.png';
import Evolve1 from '../../assets/arknights/img/icon_evolve_1.png';
import Evolve2 from '../../assets/arknights/img/icon_evolve_2.png';
import {AssistCharacter, Player} from '../../skland-api/arknights';

const evolveIcon = [Evolve0, Evolve1, Evolve2];

interface AssistCharacterModuleProps {
    model: Player;
}

const AssistCharacterModule = ({model}: AssistCharacterModuleProps) => {
    const {assistChars, charInfoMap, equipmentInfoMap} = model;

    const playerAssistCharCard = (char: AssistCharacter) => {
        if (char) {
            const equip = char.equip && equipmentInfoMap[char.equip.id];
            return (
                <div className='flex gap-2 gap-2'>
                    <div className='relative flex-shrink-0 surface-d w-6rem h-6rem border-round-xl overflow-hidden'>
                        <Image className='absolute' width='100%' src={getSkinAvatarUrl(char.skinId)}/>
                        <Image className='absolute right-0 bottom-0 w-2rem h-2rem bg-black-alpha-30' width='100%'
                               src={evolveIcon[char.evolvePhase]}/>
                    </div>
                    <div className='flex flex-column flex-grow-1'>
                        <div className='flex align-items-center gap-2'>
                            <div className='text-lg'>{charInfoMap[char.charId].name}</div>
                            <div className='flex-grow-1'/>
                            <Avatar label={char.level.toString()} shape='circle'/>
                        </div>
                        <div className='flex-grow-1'/>
                        <div className='flex align-items-center gap-2'>
                            {
                                equip && equip.typeIcon != 'original' &&
                                <>
                                    <div className='relative flex center w-2rem h-2rem'>
                                        <Image className='absolute' width='100%'
                                               src={getEquipTypeShiningUrl(equip.shiningColor)}/>
                                        <Image className='absolute' width='100%'
                                               src={getEquipTypeIconUrl(equip.typeIcon)}/>
                                    </div>
                                    <div className='flex align-items-center gap-2'>
                                        <div>{equip.typeIcon.toUpperCase()}</div>
                                        <div className='text-xs bg-primary-900 border-round tag select-none'>
                                            Lv.{char.equip?.level}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='flex align-items-end gap-2'>
                            {char.skillId ? <Avatar image={getSkillIconUrl(char.skillId)}/> : <Avatar/>}
                            <div className='flex flex-column flex-grow-1'>
                                <div className='flex select-none'>
                                    <div>Rank.</div>
                                    <div>{char.mainSkillLvl + char.specializeLevel}</div>
                                </div>
                                <div className='flex gap-1'>
                                    <MiniProgressBar className='flex-grow-1' value={char.mainSkillLvl / 7 * 100}/>
                                    <MiniProgressBar className='w-1rem' value={char.specializeLevel >= 1 ? 100 : 0}
                                                     color='lightgreen'/>
                                    <MiniProgressBar className='w-1rem' value={char.specializeLevel >= 2 ? 100 : 0}
                                                     color='gold'/>
                                    <MiniProgressBar className='w-1rem' value={char.specializeLevel == 3 ? 100 : 0}
                                                     color='tomato'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='surface-0 border-round-xl flex h-6rem center text-xl text-d select-none'>NO INFO</div>
            );
        }
    };

    return (
        <div className='flex flex-column surface-card border-round-xl shadow-2'>
            <div className='flex align-items-baseline gap-2 select-none p-3'>
                <div className='text-xl'>助战干员</div>
                <div className='text-xs'>SUPPORT UNIT</div>
            </div>
            <Divider className='m-0'/>
            <div className='flex flex-column p-3 gap-3'>
                {playerAssistCharCard(assistChars[0])}
                {playerAssistCharCard(assistChars[1])}
                {playerAssistCharCard(assistChars[2])}
            </div>
        </div>
    );
};

export default AssistCharacterModule;