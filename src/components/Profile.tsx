import { useContext } from 'react';
import { ChallengesContext } from '../contexts/CallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level} = useContext(ChallengesContext)

    return (

        <div className={styles.profileContainer}>
            <img src='https://github.com/santStark.png' alt='Guilherme Santiago' />
            <div>
                <strong>Guilherme Santiago</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );

}