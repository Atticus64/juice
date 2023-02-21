import { Command } from "$/command.ts";
import { Profile } from "$/profile.ts";
import { Scheme } from "$/scheme.ts";

export interface File {
  $help?: string;
  $schema?: string;
  actions?: Command[];
  alwaysShowTabs?: boolean;
  copyFormatting?: string;
  copyOnSelect?: boolean;
  defaultProfile?: string;
  "experimental.rendering.forceFullRepaint": boolean;
  "experimental.rendering.software": boolean;
  focusFollowMouse?: boolean;
  initialCols?: number;
  initialRows?: number;
  launchMode?: string;
  profiles: {
    defaults: {
      colorScheme?: string;
      font?: {
        "size": number;
      };
      opacity?: 14;
      useAcrylic?: true;
      name: string;
    };
    list: Profile[];
  };
  schemes: Scheme[];
  showTabsInTitlebar: boolean;
  showTerminalTitleInTitlebar: boolean;
  snapToGridOnResize: boolean;
  startOnUserLogin: boolean;
  tabWidthMode: string;
  theme: string;
  useAcrylicInTabRow: boolean;
}
