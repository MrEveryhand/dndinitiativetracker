import { useState } from "react";
import "./App.css";
import CharacterMenu from "./Components/CharacterCreator";
import CharacterCard from "./Components/CharacterCard";
import BattleCard from "./Components/BattleQueueCard";
import HoldCard from "./Components/HoldQueueCard";
import * as MainLib from "./Lib/MainArraysFunctions";
import { Queue } from "./Configs/Queues";
import { Character } from "./Configs/CharacterConfig";

function App() {
  let turnDivider: Character = new Character();

  let [characterQueue, setCharacterQueue] = useState<Queue>(new Queue());
  let [battleQueue, setBattleQueue] = useState<Queue>(new Queue([turnDivider]));

  return (
    <div className="App">
      <div className="menuAndDraft">
        <CharacterMenu
          characterQueue={characterQueue}
          setFunc={setCharacterQueue}
        />
        <CharacterCard
          characterQueue={characterQueue}
          setFunc={setCharacterQueue}
        />
      </div>
      <div
        className="battleQueue"
        onDragOver={(e) => {
          MainLib.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).inBattleQueue
          );
        }}
        onDrop={(e) => {
          let charBuffer: any = characterQueue.searchCharacter(
            JSON.parse(e.dataTransfer.getData("object")).id
          );
          charBuffer.inBattleQueue = true;

          !!charBuffer && charBuffer.Initiative.value > -1
            ? battleQueue.queueAdd(MainLib.copyCharacter(charBuffer))
            : null;

          if (
            charBuffer.Initiative.value >
            battleQueue.queue[battleQueue.pointer].Initiative.value
          )
            battleQueue.modifyPointer(1);

          charBuffer.inBattleQueue = false;
          setBattleQueue(() => MainLib.cloneClass(battleQueue));
        }}
      >
        {<BattleCard battleQueue={battleQueue} setFunc={setBattleQueue} />}
      </div>
      <div
        className="holdQueue"
        onDragOver={(e) => {
          MainLib.queueOnOver(
            e,
            !JSON.parse(e.dataTransfer.getData("object")).Hold.isHold
          );
        }}
        onDrop={(e) => {
          let charBuffer: any = battleQueue.searchCharacter(
            JSON.parse(e.dataTransfer.getData("object")).id
          );
          charBuffer.Hold.isHold = true;
          battleQueue.modifyPointer(1);
          setBattleQueue(() => MainLib.cloneClass(battleQueue));
        }}
      >
        {<HoldCard battleQueue={battleQueue} setFunc={setBattleQueue} />}
      </div>
    </div>
  );
}

export default App;
