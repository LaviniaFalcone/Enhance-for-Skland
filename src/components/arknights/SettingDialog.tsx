import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Experiment} from '@icon-park/react';
import Options, {OptionItem, OptionItemType} from '../Options';
import ExperimentOptions from '../../store/arknights/config/ExperimentOptions';

interface SettingDialogProps {
    header?: React.ReactNode;
    visible?: boolean;
    onHide: () => void;
}

const SettingDialog = (props: SettingDialogProps) => {
    const experimentOptions: OptionItem[] = [
        {
            detail: '通过算法对理智值进行重新计算，通常情况下它能够使网页中显示的理智尽可能的接近游戏中的实际值。默认值：true',
            key: 'ApCorrect',
            label: '理智修正',
            type: OptionItemType.SWITCH,
            value: ExperimentOptions
        },
        {
            detail: '通过算法对无人机数量进行重新计算，通常情况下它能够使网页中显示的理智尽可能的接近游戏中的实际值，由于受到基建技能影响，修正值可能低于实际值。默认值：false',
            key: 'DroneCorrect',
            label: '无人机数量修正',
            type: OptionItemType.SWITCH,
            value: ExperimentOptions
        }
    ];

    return (
        <Dialog header={props.header} headerClassName='select-none' onHide={props.onHide} visible={props.visible}
                resizable={false} draggable={false} style={{width: '55rem'}}>
            <div className='flex flex-column gap-3'>
                <Options header='实验性设置' icon={<Experiment/>} value={experimentOptions}/>
            </div>
        </Dialog>
    );
};

export default SettingDialog;