import styles from "./OtherMessageCard.module.css";

const OtherMessageCard = ({text, timeStamp}) => {

    return (

        <div className={styles.messageCard}>
            <p>{text}</p>
            <span>{timeStamp}</span>
        </div>

    )
}
export default OtherMessageCard