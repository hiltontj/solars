import { invoke } from "@tauri-apps/api/tauri";

export type AppDate = {
  year: number;
  month: number;
  day: number;
}

export const updateDay = async (current: AppDate, day: number): Promise<AppDate> => {
  return await invoke('update_day', { current, day })
}

export const updateMonth = async (current: AppDate, month: number): Promise<AppDate> => {
  return await invoke('update_month', { current, month })
}
