import { useContext } from 'react';
import { ChallengesContext } from '../contexts/CallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {

    const {level, closeLevelModalUp} = useContext(ChallengesContext);



    return (
        <div className={styles.levelUpModalOverlay}>

            <div className={styles.levelUpModalContainer}>
                <header>{level}</header>
                <strong>Parabens!</strong>
                <p>Você alcançou um novo nivel.</p>
                <button type="button" onClick= {closeLevelModalUp}>
                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>
            </div>

        </div>
    );
}