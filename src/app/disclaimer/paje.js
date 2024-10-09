import Image from "next/image";

export default function Disclaimer() {
    return (
        <div className="ml-80 w-3/5">
            <div className="flex justify-between">
                <Image src="/grupo_gaunal.jpeg" width={120} height={100} className="ml-10 my-6"/>
                <Image src="/unal.png" width={150} height={100} className="ml-10 my-6"/>
                <Image src="/poli.png" width={250} height={100} className="ml-10 my-6"/>
            </div>
        </div>
    );
}