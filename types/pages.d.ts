export interface IPage {
  navigate(path: string): Promise<void>;
}
