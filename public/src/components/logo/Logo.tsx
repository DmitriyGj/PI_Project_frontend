import Style from "./logo.module.scss";

const Logo=({width, height})=> {
   
    return (
        <div style={{'height': height,'width': width}}>
            <img  className={Style.img} src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
        </div>
    );
}

export default Logo;