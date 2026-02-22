import GameLayout from "@/components/layout/GameLayout";
import { BabylonCanvas } from "@/components/ui/BabylonCanvas";

type Props = {
  isDark: boolean;
};

function G0004_3DBallsGame({ isDark }: Props) {
  return (

    <GameLayout
      title="3D Balls Game"
      isDark={isDark}
    >
      <BabylonCanvas />
    </GameLayout >
  )
}

export default G0004_3DBallsGame;