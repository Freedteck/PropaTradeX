import styles from "./Property.module.css"
import hero from "../../assets/hero.jpg"
import image from "../../assets/image.png"
import Button from "../../components/button/Button";

const Property = () => {
    return(
        <div className={styles.container}>
            <h1>Carlifornia, New York</h1>
            <div className={styles.visuals}>
                <div className={styles.imageCard}>
                    <img src={image} />
                </div>
                <div className={styles.vid}>
                    <div>
                      <img src={image} alt="thumbnail"/>
                    </div>
                    <div>
                      <img src={image} alt="video"/>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
              <h3>For Sales</h3>
              <h2>500 RLC</h2>
              
              <div className={styles.describe}>
                <h1>Description</h1>
                
                <h5>Property Type</h5>
                <p>3 Bedroom</p>
                
                <h5>Location</h5>
                <p>Carlifornia, NewYork</p>
                
                <h5>Description</h5>
                <p>A 3-bedroom flat, spacious residential unit featuring three separate bedrooms, typically designed for families or groups. It often includes a living room, kitchen, one or more bathrooms, and may have additional amenities such as a balcony, storage space, or parking. The flat offers comfortable living areas, making it ideal for those seeking a balance of privacy and shared space.</p>
                
              </div>
              
              <div className={styles.buttons}>
                <Button label="Buy Property" btnClass="primary" />
                <Button label="Contact Agent" btnClass="secondary" />
              </div>
            </div>
        </div>
        )
}

export default Property
