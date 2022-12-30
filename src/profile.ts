export interface Profile {
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  colorScheme?: string;
  commandline?: string;
  cursorShape?: string;
  font?: {
    face?: string;
    size?: number;
  };
  guid?: string;
  hidden?: boolean;
  name: string;
  opacity?: number;
  source?: string;
  padding?: string;
  useAcrylic?: boolean;
}
