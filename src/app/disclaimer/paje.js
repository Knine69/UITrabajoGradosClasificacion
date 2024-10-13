import Image from "next/image";

export default function Disclaimer() {
    return (
        <div className="ml-24 w-4/5">
            <div className="flex justify-between">
                <Image src="/output-onlinepngtools.png" width={250} height={80} className="ml-10 my-6"/>
                <Image src="/unal.png" width={300} height={80} className="ml-10 my-6"/>
                <Image src="/poli.png" width={400} height={100} className="ml-10 my-6"/>
            </div>
        </div>
    );
}