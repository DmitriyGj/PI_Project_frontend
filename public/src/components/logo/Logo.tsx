import Style from "./logo.module.scss";

const Logo=({width, height})=> {
   
    return (
        <div style={{'width': width}}>
            <img  className={Style.img} src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
            {width}
        </div>
    );
}

export default Logo;