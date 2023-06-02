import { useDeskproElements } from "@deskpro/app-sdk";
import type { FC } from "react";

const HomePage: FC = () => {
  useDeskproElements(({ registerElement, clearElements  }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <>
      HomePage
    </>
  );
};

export { HomePage };
