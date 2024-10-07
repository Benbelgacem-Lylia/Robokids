import Landing from '../../components/Lnading/Landing';
import Navbar from '../../components/Navbar/Navbar';
import Program from '../../components/Program/Program';
import ImageSlider from '../../components/Slider/Slider';
import Teachers from '../../components/Teachers/Teachers';
import Location from '../../components/Location/Location';
 import Footer from '../../components/Footer/Footer';
function SchoolInfo(){
    const sliderOne = [
        "/images/child-making-robot.jpg",
        "/images/s.jpg",
        "/images/s2.jpg", 
      ];
    const sliderTwo=[
        "/images/s21.jpg",
        "/images/s22.jpg",
        "/images/s222.jpg", 
    ]
    return(
        <>
          <Navbar/>
          <Landing/>
          <ImageSlider images={sliderOne} />
          <Program/>
          <ImageSlider images={sliderTwo}/>
          <Teachers/>
          <Location/>
          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>  */}
            <Footer />
           {/* </div> */}
        </>
    )
}
export default SchoolInfo;