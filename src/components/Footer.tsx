import Image from "next/image";

const Footer = () => {
    return(
        <div className="bg-walterWhite p-5 flex flex-col items-center justify-center">
            <Image src='/logo.png' width={133} height={133} alt="Full Stack Week"/>
            <p className="text-sm font-medium text-primaryDarker mt-1">Todos os direitos reservados.</p>
        </div>
    )
};

export default Footer;