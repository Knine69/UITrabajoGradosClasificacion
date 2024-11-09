import Image from "next/image";

export default function Disclaimer() {
    return (
        <div className="ml-4 md:ml-16 lg:ml-24 w-full md:w-4/5">
            <div className="flex justify-between items-center space-x-4">
                <Image
                    src="/grupo_gaunal.png"
                    width={350}
                    height={80}
                    className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56"
                    alt="Grupo Gaunal"
                />
                <Image
                    src="/unal.png"
                    width={300}
                    height={80}
                    className="w-20 sm:w-28 md:w-36 lg:w-44 xl:w-52"
                    alt="UNAL"
                />
                <Image
                    src="/politecnico.png"
                    width={400}
                    height={100}
                    className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-64"
                    alt="Politecnico"
                />
            </div>
        </div>
    );
}