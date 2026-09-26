import { motion } from "framer-motion";
import hero from "@/assets/hero-burger.jpg";

export function HeroBanner({ onPedir }: { onPedir: () => void }) {
  return (
    <section className="relative h-[35vh] min-h-[260px] w-full overflow-hidden md:h-[42vh]">
      <img
        src={hero}
        alt="Hamburguer smash sendo prensado na chapa"
        width={1600}
        height={912}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-background/75" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4"
      >
        <h1 className="font-display text-4xl leading-none text-foreground sm:text-6xl">
          SMASH. SUCULENTO. <span className="text-primary">BRASILEIRO.</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Blend bovino prensado na chapa, queijo derretendo, pao brioche tostado. Pedido em 2
          toques.
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={onPedir}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-display text-xl tracking-wide text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            BORA PEDIR
          </button>
        </div>
      </motion.div>
    </section>
  );
}
