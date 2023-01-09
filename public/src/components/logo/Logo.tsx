import Image from 'next/image';
import Style from './logo.module.scss';
import Link from 'next/link';
import { LogoProps } from './types';
import logoImg from '../../media/logo.png';


const Logo=({ width, height, ...rest }: LogoProps)=> {
    return (
        <>
            <Link href='/'>
                <div  {...rest}>
                    <Image className={ Style.img } alt='siteLogo' src={logoImg}/>
                </div>
            </Link>
        </>
    );
};

export default Logo;
