import React from "react";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import '../slider/css/styles.css'
   
class Slider    extends  React.Component{
     state={
        data:[]

     }


  componentDidMount() {
    fetch("http://localhost:8080/api/sliderpicture")
      .then(response => response.json())
      .then((res) => {
             
        this.setState({ data: res.data })
      })
      .catch((error) => console.log(error))
  }
    render(){

  console.log(this.state.data.map((item,index)=>{ console.log(item.photoname[0],item.photoname[1],item.photoname[2])}))
       
     

     
          
  return(
      <div>
  
            
             {this.state.data.map((item,index)=>{
               return    <div key={index}>
          <Carousel
          autoPlay={true}
          showThumbs={false}
          dynamicHeight={false}
          >
            
       
                <div>
                <img src={"http://localhost:8080/uploads/" + item.photoname[0]}  className="heightset" />

                
                </div>
                <div>
                   
              <img src={"http://localhost:8080/uploads/" + item.photoname[1]}  className="heightset" />
                 
                </div>
                <div>
                <img src={"http://localhost:8080/uploads/" + item.photoname[2]} className="heightset" />
{/* 
                    <p className="legend">Legend 3</p> */}
                </div>
          

             
            </Carousel>

              </div> })}

      </div>
  )


 }





}
 export default Slider;