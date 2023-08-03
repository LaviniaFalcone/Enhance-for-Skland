import React, {useState} from 'react';
import SklandBindList from '../components/SklandBindList';
import {useMountEffect} from 'primereact/hooks';
import {useNavigate} from 'react-router-dom';
import {LocalUser} from '../location';
import {queryBind} from '../skland-api/user';
import {readSessionStorage} from '../util/storage';
import userStore from '../store/userStore';
import {SklandBinding} from '../skland-api';

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