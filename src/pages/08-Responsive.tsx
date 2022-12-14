import styled from "styled-components";
import bgImg from "../assets/01-bg-mobile_home.webp";
import { PrimaryBtn } from "../styled-components/PrimaryBtn";
import  LOGO from '../assets/LOGO.png'


type StyledBoxProp = {
  img: string;
};

const StyledBox = styled.div<StyledBoxProp>`
  background-image: url(${({ img }) => img});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;  
`;

const StyledResponsive = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem;
  height: 15%;
  width: 90%;
  padding: 0.5rem;
  img {
        width: 30%;       
    }
  p{
    font-size: 2rem;
    color: #fff;
    margin-left: 0.5rem;
  }    
  @media (min-width: 768px) {
    .imgResponsive{
        width: 10%;
    }
  }  
  @media (max-width: 768px) {
    .imgResponsive{
        width: 10%;
    }
  }
  @media (max-width: 600px) {
    .imgResponsive{
        width: 20%;
    }
  }
  @media (max-width: 430px) {
    .imgResponsive{
        width: 30%;
    }   
  }

`;

const StyledResponsive1 = styled.div`   
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  margin-bottom: 4rem;
  p{
    font-size: 0.8rem;
    color: #fff;
    margin: 0;
    padding: 0;
  }  
 
`;

export const Responsive = () => {
  return (    
        <StyledBox img={bgImg}>
            <StyledResponsive>   
                <img className="imgResponsive" src={LOGO} alt='logo_apes'/>
                <p>IS BEING DEVELOPED ON MOBILE</p>             
            </StyledResponsive>
            <StyledResponsive1>
                <p>Keep up to date with our news and</p>
                <p>find out when is the Grand Opening!</p>
                <PrimaryBtn label="LEARN MORE" />
            </StyledResponsive1>
        </StyledBox>
    
  );
};
