export interface characterParameter {
  label: string;
  type: string;
  value: any;
}

interface Hold {
  isHold: boolean;
  comment: string;
}

export class Character {
  id!: number;
  battleId!: number;
  holdId!: number;
  arrayPosition!: number;
  Name: characterParameter;
  Image: characterParameter;
  Initiative: characterParameter;
  Agility: characterParameter;
  CurrentHP: characterParameter;
  MaxHP: characterParameter;
  State: characterParameter;
  Hold: Hold;
  inBattleQueue: boolean = false;
  inHoldQueue: boolean = false;
  constructor() {
    this.Name = {
      label: "Name", //Later create another language config and make dependencies with it
      type: "text",
      value: "",
    };
    this.Image = {
      label: "Image",
      type: "file",
      value: null,
    };
    this.Initiative = {
      label: "Initiative",
      type: "number",
      value: -1,
    };
    this.Agility = {
      label: "Agility",
      type: "number",
      value: -1,
    };
    this.CurrentHP = {
      label: "HP",
      type: "number",
      value: -1,
    };
    this.MaxHP = {
      label: "Max HP",
      type: "number",
      value: -1,
    };
    this.State = {
      label: "State",
      type: "string",
      value: "",
    };
    this.Hold = {
      isHold: false,
      comment: "",
    };
  }

  isDragging: boolean = false;
  cardIsOver: boolean = false;
  onDragStart = (e: any, character: Character) => {
    this.isDragging = true;
    e.dataTransfer.setData("object", JSON.stringify(character));
  };
  onDragOver = (e: any) => {
    this.cardIsOver = true;
    e.stopPropagation();
    e.preventDefault();
  };
  onDragLeave = () => {
    this.cardIsOver = false;
  };
  onDrop = (endFunc: void) => {
    endFunc;
  };
  onDragEnd = () => {
    this.isDragging = false;
  };
}

export var propsExceptions: object = { Initiative: -1 };
