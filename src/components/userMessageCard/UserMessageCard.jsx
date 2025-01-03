import styles from "./UserMessageCard.module.css";

const UserMessageCard = ({text, timeStamp}) => {
    return (

        <div className={styles.messageCard}>
            <p>{text}</p>
            <span>{timeStamp}</span>
        </div>
    )
}
export default UserMessageCard