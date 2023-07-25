export class ButtonConfig {
  label?: string;
  imagePath?: string;
  iconClass?: string;
  action: () => void;

  constructor(
    label: string,
    action: () => void,
    imagePath?: string,
    iconClass?: string
  ) {
    this.label = label;
    this.action = action;
    this.imagePath = imagePath;
    this.iconClass = iconClass;
  }
}
