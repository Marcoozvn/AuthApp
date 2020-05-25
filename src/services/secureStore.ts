import * as SecureStore from 'expo-secure-store';

export async function saveItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value)
}

export async function getItem(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}
