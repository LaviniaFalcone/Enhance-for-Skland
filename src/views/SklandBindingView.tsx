import {useMountEffect} from 'primereact/hooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SklandBindList from '../components/SklandBindList';
import {LocalUser} from '../location';
import {SklandBinding} from '../skland-api';
import {queryBind} from '../skland-api/user';
import userStore from '../store/userStore';
import {readSessionStorage} from '../util/storage';

const SklandBindingView = () => {
    const navigate = useNavigate();

    const [binding, setBinding] = useState<SklandBinding[]>();

    useMountEffect(() => {
        const current = readSessionStorage<LocalUser>('CurrentLogin');
        if (current) {
            userStore.user = current.user;
            queryBind(current.cred).then(r => setBinding(r));
        } else {
            navigate('/');
        }
    });

    return (
        <>{binding && binding.map((bind, index) => (<SklandBindList value={bind} key={index}/>))}</>
    );
};

export default SklandBindingView;