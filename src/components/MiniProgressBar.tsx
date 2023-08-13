import {ProgressBar} from 'primereact/progressbar';

interface MiniProgressBar {
    className?: string;
    color?: string;
    value?: string | number;
    height?: string | number;
    indeterminate?: boolean;
}

const MiniProgressBar = ({className, color, value, height, indeterminate}: MiniProgressBar) => {
    return (
        <ProgressBar className={className} value={value} showValue={false} color={color}
                     mode={indeterminate ? 'indeterminate' : 'determinate'} style={{height: height || '0.2rem'}}/>
    );
};

export default MiniProgressBar;