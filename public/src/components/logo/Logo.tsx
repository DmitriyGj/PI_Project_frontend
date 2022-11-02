import Image from 'next/image';
import Style from './logo.module.scss';
import { LogoProps } from './types';
import logoimg from '../../media/logo.png';


const Logo=({ width, height, ...rest }: LogoProps)=> {
    return (
        <div style={{ 'height': height, 'width': width }} {...rest}>
            <Image className={ Style.img } alt='siteLogo' src={logoimg}/>
        </div>
    );
};

export default Logo;
