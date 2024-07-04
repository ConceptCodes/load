import { Globe2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useStore from "@/store/useStore";
import type { Languages } from "types";
import { cn } from "@/lib/utils";

const LanguageModal = () => {
  const { currentLanguage, setLanguage } = useStore();

  const iconMap = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
  };

  const Option = ({
    language,
    active,
  }: {
    language: Languages;
    active: boolean;
  }) => {
    return (
      <button
        className={cn(
          "w-50 items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-2xl font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75",
          active && "bg-primary/10 text-primary ring-primary-foreground ring-2"
        )}
        onClick={() => setLanguage(language)}
      >
        <span>{iconMap[language]}</span>
        {currentLanguage === language && (
          <span className="text-primary">✔</span>
        )}
      </button>
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Globe2Icon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose your Language</DialogTitle>
          <DialogDescription className="flex-wrap space-x-3">
            <Option language="en" active={currentLanguage == "en"} />
            <Option language="es" active={currentLanguage == "es"} />
            <Option language="fr" active={currentLanguage == "fr"} />
            <Option language="de" active={currentLanguage == "de"} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;
