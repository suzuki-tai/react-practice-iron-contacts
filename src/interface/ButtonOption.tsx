export interface ButtonOption {
  type: string;
  className: string;
  title: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
