import React from 'react';
import {Divider} from 'primereact/divider';
import MiniProgressBar from '../MiniProgressBar';
import {Avatar} from 'primereact/avatar';
import {getArknightsCharAvatarUrl, getArknightsCharSkillIconUrl} from '../../skland-api/fn';
import {
    Association,
    BatteryCharge,
    Box,
    Chess,
    Components,
    Drone,
    Dumbbell,
    FiveKey,
    FourKey,
    Notes,
    OneKey,
    Order,
    SevenKey,
    SixKey,
    Sleaves,
    ThreeKey,
    TwoKey
} from '@icon-park/react';

interface PlayerBuildCardProps {
    character: ArknightsPlayer;
}

const InfrastructureModule = ({character}: PlayerBuildCardProps) => {
    const {building, chars, charInfoMap} = character;
    const {control, dormitories, hire, labor, manufactures, meeting, powers, tradings, training} = building;

    const formula: { [id: string]: string } = {
        1: '基础作战记录', 2: '初级作战记录', 3: '中级作战记录', 4: '赤金',
        5: '先锋双芯片', 6: '近卫双芯片', 7: '重装双芯片', 8: '狙击双芯片',
        9: '术师双芯片', 10: '医疗双芯片', 11: '辅助双芯片', 12: '特种双芯片',
        13: '源石碎片', 14: '源石碎片'
    };

    const card = (content: React.ReactNode) => (
        <div className='flex flex-column surface-0 border-round-lg'>{content}</div>
    );

    const header = (title: string, level: number, content?: React.ReactNode) => (
        <div className='flex align-items-baseline gap-2 select-none p-2' style={{height: '2.5rem'}}>
            <div>{title}</div>
            <div className='text-xs'>Lv.{level}</div>
            <div className='flex-grow-1'/>
            <div>{content}</div>
        </div>
    );

    const getAvatarUrl = (charId: string) => {
        const char = chars.find(char => char.charId == charId);
        if (char) return getArknightsCharAvatarUrl(char.skinId);
    };

    const charsGrid = (chars: ArknightsBuildChar[], col: number) => {
        const getApColor = (ap: number) => {
            if (ap <= 0) return 'tomato';
            if (ap <= 2160000) return 'orange';
            if (ap == 8640000) return 'lightgreen';
        };

        if (chars.length < col) {
            for (let i = chars.length; i < col; i++) {
                chars.push({charId: `empty_char_${i}`, ap: 0, index: -1});
            }
        }

        return (
            <div className='flex h-2rem gap-2'>
                {chars.map(char => (
                    <div className='flex col gap-2 overflow-hidden p-0' key={char.charId}>
                        <div className='flex flex-shrink-0 surface-d border-round-lg overflow-hidden'>
                            {char.index == -1 ? <Avatar icon={<Chess/>}/> : <Avatar image={getAvatarUrl(char.charId)}/>}
                        </div>
                        <div className='flex flex-column flex-grow-1 justify-content-end overflow-hidden gap-1'>
                            <div className='text-xs text-ellipsis'>
                                {char.index != -1 ? charInfoMap[char.charId].name : '虚位以待'}
                            </div>
                            <MiniProgressBar value={char.ap <= 0 && char.index != -1 ? 100 : char.ap / 8640000 * 100}
                                             color={getApColor(char.ap)}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const controlCard = (
        <>
            {header('控制中枢', control.level)}
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex align-items-center h-2rem gap-2'>
                    <Avatar icon={<Components/>}/>
                    <div>LEVEL OF CONTROL INTERFACE</div>
                </div>
                {charsGrid(control.chars, 5)}
            </div>
        </>
    );

    const meetingCard = () => {
        const shareTag = (
            <div className='text-xs border-round tag' style={{background: 'orange'}}>线索交流开启中</div>
        );

        const findClue = (clue: string) => {
            return meeting.clue.board.find(item => item == clue) && 'white';
        };

        return (
            <>
                {header('会客室', meeting.level, meeting.clue.sharing && shareTag)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    <div className='flex h-2rem gap-2'>
                        <Avatar icon={<Notes/>}/>
                        <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                            <div className='flex align-items-baseline gap-1'>
                                <div className='text-lg' style={{color: 'orange'}}>{meeting.clue.own}</div>
                                <div className='text-xs'>/</div>
                                <div className='text-xs'>10</div>
                                <div className='flex-grow-1'/>
                                <div className='flex gap-1' style={{color: 'transparent'}}>
                                    <OneKey style={{color: findClue('RHINE')}}/>
                                    <TwoKey style={{color: findClue('PENGUIN')}}/>
                                    <ThreeKey style={{color: findClue('BLACKSTEEL')}}/>
                                    <FourKey style={{color: findClue('URSUS')}}/>
                                    <FiveKey style={{color: findClue('GLASGOW')}}/>
                                    <SixKey style={{color: findClue('KJERAG')}}/>
                                    <SevenKey style={{color: findClue('RHODES')}}/>
                                </div>
                            </div>
                            <MiniProgressBar value={meeting.clue.own * 10} color='orange'/>
                        </div>
                    </div>
                    {charsGrid(meeting.chars, 2)}
                </div>
            </>
        );
    };

    const hireCard = (
        <>
            {header('办公室', hire.level)}
            <Divider className='m-0'/>
            <div className='flex flex-column gap-2 p-2'>
                <div className='flex h-2rem gap-2'>
                    <Avatar icon={<Association/>}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={hire.refreshCount == 0}
                                     value={hire.refreshCount * 100}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={hire.refreshCount == 1}
                                     value={Math.max(hire.refreshCount - 1, 0) * 100}/>
                    <MiniProgressBar className='flex-grow-1 h-full' indeterminate={hire.refreshCount == 2}
                                     value={Math.max(hire.refreshCount - 2, 0) * 100}/>
                </div>
                {charsGrid(hire.chars, 1)}
            </div>
        </>
    );

    const trainingCard = () => {
        const char = chars.find(char => char.charId == training.trainee?.charId);

        const getSkillIconUrl = (skillIndex: number) => {
            return getArknightsCharSkillIconUrl(char!.skills[skillIndex].id);
        };

        const getSkillLevel = () => {
            if (training.trainee) {
                return char?.skills[training.trainee.targetSkill]?.specializeLevel || -1;
            }
            return -1;
        };

        const isCompleted = (skillLevel: number) => {
            if (!training.trainee) return 0;
            if (getSkillLevel() >= skillLevel) {
                return 100;
            }
            return 0;
        };

        const isUpgrading = (targetLevel: number) => {
            if (training.remainSecs == 0) return false;
            return getSkillLevel() == targetLevel - 1;
        };

        return (
            <>
                {header('训练室', training.level)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    <div className='flex h-2rem gap-2'>
                        <div className='flex surface-d border-round-lg overflow-hidden'>
                            {
                                training.trainee ?
                                    <Avatar image={getAvatarUrl(training.trainee.charId)}/> :
                                    <Avatar icon={<Dumbbell/>}/>
                            }
                        </div>
                        {
                            training.trainee && training.trainee.targetSkill != -1 ?
                                <Avatar image={getSkillIconUrl(training.trainee.targetSkill)}/> : <Avatar/>
                        }
                        <MiniProgressBar className='flex-grow-1 h-full' color='lightgreen' value={isCompleted(0)}
                                         indeterminate={isUpgrading(1)}/>
                        <MiniProgressBar className='flex-grow-1 h-full' color='gold' value={isCompleted(1)}
                                         indeterminate={isUpgrading(2)}/>
                        <MiniProgressBar className='flex-grow-1 h-full' color='tomato' value={isCompleted(2)}
                                         indeterminate={isUpgrading(3)}/>
                    </div>
                    {charsGrid(training.trainer ? [training.trainer] : [], 1)}
                </div>
            </>
        );
    };

    const dormitoryCard = (dormitory: ArknightsBuildDormitory) => {
        const comfortTag = (
            <div className='flex text-sm align-items-baseline gap-1' style={{color: 'greenyellow'}}>
                <Sleaves/>
                <div>{dormitory.comfort}</div>
            </div>
        );

        return (
            <>
                {header('宿舍', dormitory.level, comfortTag)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    {charsGrid(dormitory.chars, 5)}
                </div>
            </>
        );
    };

    const manufactureCard = (manufacture: ArknightsBuildManufacture) => {
        const formulaTag = (
            <div className='text-xs border-round tag' style={{background: 'goldenrod'}}>
                {formula[manufacture.formulaId] || '无制造项目'}
            </div>
        );

        return (
            <>
                {header('制造站', manufacture.level, formulaTag)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    <div className='flex h-2rem gap-2 select-none'>
                        <Avatar icon={<Box/>}/>
                        <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                            <div className='flex align-items-baseline gap-1'>
                                <div className='text-lg' style={{color: 'gold'}}>{manufacture.weight}</div>
                                <div className='text-xs'>/</div>
                                <div className='text-xs'>{manufacture.capacity}</div>
                                <div className='flex-grow-1'/>
                                <div className='text-sm'>已制造</div>
                            </div>
                            <MiniProgressBar value={manufacture.weight / manufacture.capacity * 100} color='gold'/>
                        </div>
                        <Avatar label={manufacture.complete.toString()} shape='circle'/>
                    </div>
                    {charsGrid(manufacture.chars, 3)}
                </div>
            </>
        );
    };

    const powerCard = (power: ArknightsBuildPower) => {
        const generation = 2 ** (power.level - 1) * 60 + (2 ** (power.level - 1) - 1) * 10;

        return (
            <>
                {header('发电站', power.level)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    <div className='flex h-2rem gap-2'>
                        <Avatar icon={<BatteryCharge/>}/>
                        <div className='flex align-items-center flex-grow-1 gap-2'>
                            <MiniProgressBar className='flex-grow-1 h-full' indeterminate color='greenyellow'/>
                            <Avatar className='text-sm' style={{color: 'greenyellow'}} label={generation.toString()}/>
                        </div>
                    </div>
                    {charsGrid(power.chars, 1)}
                </div>
            </>
        );
    };

    const tradingCard = (trading: ArknightsBuildTrading) => {
        const strategyTag = (
            <div className='text-xs border-round tag' style={{background: 'dodgerblue'}}>
                {trading.strategy == 'O_GOLD' ? '龙门币' : '合成玉'}
            </div>
        );

        return (
            <>
                {header('贸易站', trading.level, strategyTag)}
                <Divider className='m-0'/>
                <div className='flex flex-column gap-2 p-2'>
                    <div className='flex h-2rem gap-2'>
                        <Avatar icon={<Order/>}/>
                        <div className='flex flex-column justify-content-end flex-grow-1 gap-1'>
                            <div className='flex align-items-baseline gap-1'>
                                <div className='text-lg' style={{color: 'deepskyblue'}}>{trading.stock.length}</div>
                                <div className='text-xs'>/</div>
                                <div className='text-xs'>{trading.stockLimit}</div>
                            </div>
                            <MiniProgressBar value={trading.stock.length / trading.stockLimit * 100}
                                             color='deepskyblue'/>
                        </div>
                    </div>
                    {charsGrid(trading.chars, 3)}
                </div>
            </>
        );
    };

    const findRoom = (slotId: string) => {
        const find = (room: any) => room.slotId == slotId;
        const dormitory = dormitories.find(find);
        if (dormitory) return dormitoryCard(dormitory);
        const manufacture = manufactures.find(find);
        if (manufacture) return manufactureCard(manufacture);
        const power = powers.find(find);
        if (power) return powerCard(power);
        const trading = tradings.find(find);
        if (trading) return tradingCard(trading);
    };

    return (
        <div className='flex flex-column surface-card border-round-xl'>
            <div className='flex align-items-baseline gap-2 select-none p-3'>
                <div className='text-xl'>基建</div>
                <div className='text-sm'>RHODES ISLAND INFRASTRUCTURE COMPLEX</div>
                <div className='flex-grow-1'/>
                <div className='flex flex-column w-6rem'>
                    <div className='flex align-items-baseline gap-1'>
                        <Drone className='text-purple-300'/>
                        <div className='text-purple-300'>{labor.value}</div>
                        <div className='text-xs'>/</div>
                        <div className='text-xs'>{labor.maxValue}</div>
                    </div>
                    <MiniProgressBar value={labor.value / labor.maxValue * 100} color='var(--purple-300)'/>
                </div>
            </div>
            <Divider className='m-0'/>
            <div className='grid grid-nogutter flex-column gap-2 px-3 pt-3 pb-2'>
                <div className='grid flex-nowrap'>
                    <div className='col-12'>{card(controlCard)}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-4'>{card(findRoom('slot_24'))}</div>
                    <div className='col-4'>{card(findRoom('slot_25'))}</div>
                    <div className='col-4'>{card(findRoom('slot_26'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-4'>{card(findRoom('slot_14'))}</div>
                    <div className='col-4'>{card(findRoom('slot_15'))}</div>
                    <div className='col-4'>{card(findRoom('slot_16'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-4'>{card(findRoom('slot_5'))}</div>
                    <div className='col-4'>{card(findRoom('slot_6'))}</div>
                    <div className='col-4'>{card(findRoom('slot_7'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-4'>{card(meetingCard())}</div>
                    <div className='col-4'>{card(hireCard)}</div>
                    <div className='col-4'>{card(trainingCard())}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-12'>{card(findRoom('slot_28'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-12'>{card(findRoom('slot_20'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-12'>{card(findRoom('slot_9'))}</div>
                </div>
                <div className='grid flex-nowrap'>
                    <div className='col-12'>{card(findRoom('slot_3'))}</div>
                </div>
            </div>
        </div>
    );
};

export default InfrastructureModule;